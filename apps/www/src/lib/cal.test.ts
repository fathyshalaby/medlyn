import assert from "node:assert/strict";
import { afterEach, describe, it } from "node:test";
import { calBookingHref, getCalConfig } from "./cal.ts";

const keys = ["NEXT_PUBLIC_CAL_LINK", "NEXT_PUBLIC_CAL_ORIGIN"] as const;
const previous = Object.fromEntries(keys.map((key) => [key, process.env[key]]));

afterEach(() => {
  for (const key of keys) {
    const value = previous[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("getCalConfig", () => {
  it("stays unconfigured when the link env is empty", () => {
    delete process.env.NEXT_PUBLIC_CAL_LINK;
    delete process.env.NEXT_PUBLIC_CAL_ORIGIN;
    const cal = getCalConfig();
    assert.equal(cal.configured, false);
    assert.equal(cal.origin, "https://cal.eu");
    assert.equal(cal.eventPath, "");
    assert.equal(cal.embedSrc, "https://app.cal.eu/embed/embed.js");
  });

  it("switches the event from a bare path and origin env", () => {
    process.env.NEXT_PUBLIC_CAL_LINK = "medlyn/clinic";
    process.env.NEXT_PUBLIC_CAL_ORIGIN = "https://cal.com";
    const cal = getCalConfig();
    assert.equal(cal.configured, true);
    assert.equal(cal.origin, "https://cal.com");
    assert.equal(cal.eventPath, "medlyn/clinic");
    assert.equal(cal.bookingHref, "https://cal.com/medlyn/clinic");
    assert.equal(cal.embedSrc, "https://app.cal.com/embed/embed.js");
  });

  it("accepts a full booking URL and uses that host", () => {
    process.env.NEXT_PUBLIC_CAL_LINK = "https://cal.eu/team/medlyn/intro/";
    process.env.NEXT_PUBLIC_CAL_ORIGIN = "https://cal.com";
    const cal = getCalConfig();
    assert.equal(cal.configured, true);
    assert.equal(cal.origin, "https://cal.eu");
    assert.equal(cal.eventPath, "team/medlyn/intro");
    assert.equal(cal.bookingHref, "https://cal.eu/team/medlyn/intro");
  });
});

describe("calBookingHref", () => {
  it("adds guest prefills when the event is configured", () => {
    process.env.NEXT_PUBLIC_CAL_LINK = "medlyn/clinic";
    delete process.env.NEXT_PUBLIC_CAL_ORIGIN;
    const href = calBookingHref({
      name: "Ada",
      email: "ada@example.test",
      notes: "Clinic lead",
    });
    const url = new URL(href);
    assert.equal(url.origin, "https://cal.eu");
    assert.equal(url.pathname, "/medlyn/clinic");
    assert.equal(url.searchParams.get("name"), "Ada");
    assert.equal(url.searchParams.get("email"), "ada@example.test");
    assert.equal(url.searchParams.get("notes"), "Clinic lead");
  });
});
