"use client";

import { type FormEvent, useState } from "react";
import { BookingCalendar } from "./booking-calendar";

type Details = { name: string; email: string; notes: string };

const fieldClass =
  "mt-[0.4rem] w-full rounded-[1.2rem] border-2 border-transparent bg-surface-primary px-[1.4rem] py-[1.2rem] text-body-md text-text-primary outline-hidden focus-visible:border-blue-500 focus-visible:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]";

const buttonClass =
  "inline-flex h-10 w-fit cursor-pointer items-center rounded-[1.2rem] border-2 border-transparent bg-orange-500 px-[1.4rem] text-body-sm text-text-invert-primary outline-hidden hover:bg-surface-tertiary focus-visible:border-blue-500 focus-visible:shadow-[0_0_0_3px_rgba(66,181,220,0.30)]";

function Field({
  id,
  label,
  type,
  autoComplete,
}: {
  id: string;
  label: string;
  type: string;
  autoComplete: string;
}) {
  return (
    <label className="block text-body-sm text-text-secondary" htmlFor={id}>
      {label}
      <input
        id={id}
        name={id}
        type={type}
        autoComplete={autoComplete}
        required
        className={fieldClass}
      />
    </label>
  );
}

export function BookingFunnel({
  calLink,
  fallbackHref,
}: {
  calLink: string;
  fallbackHref: string;
}) {
  const [details, setDetails] = useState<Details | null>(null);
  const [booked, setBooked] = useState(false);
  const [embedFailed, setEmbedFailed] = useState(false);
  const calendarReady = Boolean(details && calLink && !embedFailed);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const organisation = String(data.get("organisation") ?? "").trim();
    const role = String(data.get("role") ?? "").trim();
    setBooked(false);
    setEmbedFailed(false);
    setDetails({
      name: String(data.get("name") ?? "").trim(),
      email: String(data.get("email") ?? "").trim(),
      notes: `Organisation: ${organisation}\nRole: ${role}\nThey want to add Medlyn to their system.`,
    });
  }

  return (
    <div className="mt-[4.8rem]">
      <form className="grid max-w-[62rem] gap-[1.6rem]" onSubmit={onSubmit}>
        <Field id="name" label="Name" type="text" autoComplete="name" />
        <Field id="email" label="Work email" type="email" autoComplete="email" />
        <Field id="organisation" label="Organisation" type="text" autoComplete="organization" />
        <Field id="role" label="Role" type="text" autoComplete="organization-title" />
        <button className={buttonClass} type="submit">
          {calendarReady ? "Update the calendar" : "Continue to the calendar"}
        </button>
      </form>
      {booked ? (
        <p className="mt-[2.4rem] text-body-lg text-text-primary" role="status">
          You are booked. We will use the call to talk about adding Medlyn to your system.
        </p>
      ) : null}
      {calendarReady && details ? (
        <div className="mt-[3.2rem] overflow-hidden rounded-[1.6rem] bg-surface-primary p-[0.8rem]">
          <BookingCalendar
            calLink={calLink}
            email={details.email}
            name={details.name}
            notes={details.notes}
            onBooked={() => setBooked(true)}
            onError={() => setEmbedFailed(true)}
          />
        </div>
      ) : null}
      {!calLink || embedFailed ? (
        <p
          className="mt-[2.4rem] max-w-[62rem] text-body-md text-text-secondary"
          role={details ? "status" : undefined}
        >
          {details
            ? "The calendar on this page is not connected yet. "
            : "The calendar opens on Cal.eu. "}
          <a
            className="rounded-[0.4rem] underline underline-offset-2 outline-hidden focus-visible:border-2 focus-visible:border-blue-500"
            href={fallbackHref}
            target="_blank"
            rel="noopener noreferrer"
          >
            Book on Cal.eu
          </a>
          .
        </p>
      ) : null}
    </div>
  );
}
