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

| Action | Touch | Keyboard / mouse |
| --- | --- | --- |
| Move / thrust | Left thumbstick | WASD or arrow keys |
| Look / steer | Drag anywhere | Drag with the mouse |
| Boost (space) / Jetpack (on foot) | BOOST / JET button | Space or Shift |
| Interact (dock, land, board, terminal) | On-screen prompt | E |
| Scan | SCAN button | F |

## Features

- **Seamless flight:** fly from space through the atmosphere to the ground and back with no loading screens.
- **Freight contracts:** take standard, fragile, perishable and hazardous loads between the station and towns in each system; your hold has limited crate slots.
- **Space stations:** dock by autopilot in a hangar bay; trade, upgrade your ship and pick up contracts.
- **Settlements:** 1–2 habitable planets per system, each with a named town, landing pad, cargo terminal and residents.
- **Procedural galaxy:** warp to seeded star systems with their own star, nebula and planet types (lush, ocean, desert, frozen, scorched, toxic, exotic).
- **Living worlds:** day/night cycle, wildlife that grazes and flees, crystal deposits to mine and sell.
- **Unreal-style rendering:** HDR pipeline with bloom, ACES tonemapping, lens flares, god rays, image-based lighting, shadows, wind-blown grass and eye adaptation.
- **Scales to the device:** Low, High and Epic graphics settings plus automatic dynamic resolution.

Progress (units, cargo, upgrades, current system) is saved in the browser's local storage.
