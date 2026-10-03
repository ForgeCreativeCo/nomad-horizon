# Nomad Horizon

A mobile-first space trucker game that runs in the browser. Haul freight between space stations and frontier towns, fly seamlessly from orbit down to procedurally generated planets, and warp across an endless galaxy.

Everything (planets, terrain, skies, wildlife, star systems and towns) is generated in code at runtime with [three.js](https://threejs.org/) r128. There are no image or model assets.

## Play

Open `index.html` in a modern browser, or host the repo with any static host (GitHub Pages, Netlify, Vercel). It works best on a phone in landscape.

### Install on your phone

Nomad Horizon is a Progressive Web App. Once it's hosted over HTTPS:

- **Android (Chrome):** tap **INSTALL APP** on the title screen, or use the browser menu's *Install app*.
- **iPhone / iPad (Safari):** tap **Share**, then **Add to Home Screen**.

The installed app opens full screen in landscape and works offline after the first launch. When releasing a new version, bump `VERSION` in `sw.js` so installed copies refresh their cache.

**Flying**

| Action | Touch | Keyboard / mouse |
| --- | --- | --- |
| Steer (turn rate) | Left thumbstick (pitch inverted by default; PITCH button toggles) | Arrow keys, A / D |
| Set speed (stays set, includes reverse) | Throttle lever | W / S |
| Boost | BOOST button | Space or Shift |
| Look around the ship | Drag anywhere (eases back on release) | Drag with the mouse |
| Dock, land, board | On-screen prompt | E |

**On foot**

| Action | Touch | Keyboard / mouse |
| --- | --- | --- |
| Move | Left thumbstick | WASD |
| Look | Drag anywhere | Drag with the mouse |
| Jetpack | JET button | Space or Shift |
| Scan | SCAN button | F |
| Terminal, board ship | On-screen prompt | E |
| Planet map | Tap the radar | M |

Each freighter hull has its own turn rate and weight: the Skiff snaps into turns, the Atlas swings wide and coasts out of them.

## Features

- **Seamless flight:** fly from space through the atmosphere to the ground and back with no loading screens.
- **Freight contracts:** take standard, fragile, perishable and hazardous loads between the station and towns in each system; your hold has limited crate slots.
- **Freighter progression:** start in the Skiff light courier (4 crates) and trade up through the Mule (6), Longhaul tractor-trailer (9) and Atlas heavy lifter (12) at any station; each hull handles heavier than the last.
- **Cargo modules and licences:** fit a reefer bay (perishables), shock racks (fragile cargo takes less damage), a shielded vault (hazardous, with a hazmat licence) or an aux fuel tank. Bigger hulls have more module slots. An oversize permit unlocks 3–4 crate loads on Longhaul and Atlas hulls.
- **Fuel and wear:** warps burn fuel (longer jumps and bigger hulls burn more). Bumps, atmosphere entries and jumps wear the hull, and a hull under 50% flies slower. Refuel and repair at any terminal; fuel depots sell the cheapest fuel.
- **Trucking company:** register your own company at any station, buy freighters, hire rookie, veteran or ace pilots and send ships on local runs or long hauls. They earn into the company account in real time, and at half rate for up to 8 hours while the game is closed. Collect earnings, repair worn ships and expand your head office from the station's Fleet tab. Your fleet ships berth at the station pier and show on the departures board.
- **Customs and contraband:** every system with customs has a drive-through customs hall straight ahead of the warp-in point. Fly in, stop on the scale for the scan and leave out the back (or dock at the station) to check in; legal cargo can't be signed for until you do. Settlements post contraband runs (grey goods, restricted, black-market) that pay 1.8–4× but get scanned at customs: comply, try a bribe, or run. A smuggler's compartment helps hide it.
- **Patrols and heat:** patrol cutters hail ships that skipped customs or are wanted, and do random inspections. Run and you're wanted in that system: lose them by outrunning them, diving into an atmosphere or warping out. Heat cools over time or can be paid off at a station.
- **Security levels and pirates:** each system is High, Medium, Low or Lawless security (shown in the warp menu). The lower the security, the fewer patrols, the more raiders and the better black-market pay. Raiders demand a ransom or a crate; run for the station defence grid, an atmosphere or a warp. A deflector shield and decoy flares help. You never lose your ship for good.
- **Space stations:** dock by autopilot in a hangar bay; trade, upgrade your ship and pick up contracts.
- **Open planet surfaces:** each planet is about 3 × 3 km, streamed in tiles as you fly (full detail nearby, simpler tiles further out). Where you dive in from orbit decides where you arrive.
- **Settlements:** 1–2 habitable planets per system, each with 2–4 towns (landing pad, cargo terminal, residents); every other planet has 1–2 outposts (mining camps, research outposts, fuel depots). Short-hop contracts run between towns on the same planet.
- **Planet map:** tap the radar (or press M) for a relief map with every town and outpost, your drops, your ship and a waypoint you can set.
- **Procedural galaxy:** warp to seeded star systems with their own star, nebula and planet types (lush, ocean, desert, frozen, scorched, toxic, exotic).
- **Living worlds:** day/night cycle, wildlife that grazes and flees, crystal deposits to mine and sell.
- **Unreal-style rendering:** HDR pipeline with bloom, ACES tonemapping, lens flares, god rays, image-based lighting, shadows, wind-blown grass and eye adaptation.
- **Scales to the device:** Low, High and Epic graphics settings plus automatic dynamic resolution.

Progress (units, cargo, upgrades, current system) is saved in the browser's local storage.
