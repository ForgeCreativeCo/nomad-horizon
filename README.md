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
| Steer (turn rate) | Left thumbstick | Arrow keys, A / D |
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

Each freighter hull has its own turn rate and weight: the Skiff snaps into turns, the Atlas swings wide and coasts out of them.

## Features

- **Seamless flight:** fly from space through the atmosphere to the ground and back with no loading screens.
- **Freight contracts:** take standard, fragile, perishable and hazardous loads between the station and towns in each system; your hold has limited crate slots.
- **Freighter progression:** start in the Skiff light courier (4 crates) and trade up through the Mule (6), Longhaul tractor-trailer (9) and Atlas heavy lifter (12) at any station; each hull handles heavier than the last.
- **Space stations:** dock by autopilot in a hangar bay; trade, upgrade your ship and pick up contracts.
- **Settlements:** 1–2 habitable planets per system, each with a named town, landing pad, cargo terminal and residents.
- **Procedural galaxy:** warp to seeded star systems with their own star, nebula and planet types (lush, ocean, desert, frozen, scorched, toxic, exotic).
- **Living worlds:** day/night cycle, wildlife that grazes and flees, crystal deposits to mine and sell.
- **Unreal-style rendering:** HDR pipeline with bloom, ACES tonemapping, lens flares, god rays, image-based lighting, shadows, wind-blown grass and eye adaptation.
- **Scales to the device:** Low, High and Epic graphics settings plus automatic dynamic resolution.

Progress (units, cargo, upgrades, current system) is saved in the browser's local storage.
