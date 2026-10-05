# Nomad Horizon

A mobile-first space trucker game that runs in the browser. Haul freight between space stations and frontier towns, fly seamlessly from orbit down to procedurally generated planets, and warp across an endless galaxy.

Everything (planets, terrain, skies, wildlife, star systems and towns) is generated in code at runtime with [three.js](https://threejs.org/) r128. A few hand-made 3D models live in `models/` (the Skiff, Mule, Longhaul, Atlas and Rook Twin-Boom hulls, the station hub and its wheel, the customs hall, its scanner arch, the berth modules and the pier's loader arms); anything else, or any model that fails to load, is built procedurally.

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
- **Freighter progression:** start in the Skiff light courier (4 crates) and trade up through the Mule (6), Longhaul tractor-trailer (9) and Atlas heavy lifter (12) at any station; each hull handles heavier than the last. Once you own more than one, the station's Upgrades tab has a hangar where you can switch back to any hull you've unlocked.
- **The Rook Twin-Boom:** a patched-up smuggler's freighter, sold as a special order in the Upgrades tab (cheaper in lawless systems). 8 crates, 2 module slots, a built-in smuggler's compartment, the fastest handling in the game, but thin plating that takes 60% more damage. No oversize loads.
- **Cargo modules and licences:** fit a reefer bay (perishables), shock racks (fragile cargo takes less damage), a shielded vault (hazardous, with a hazmat licence) or an aux fuel tank. Bigger hulls have more module slots. An oversize permit unlocks 3–4 crate loads on Longhaul and Atlas hulls.
- **Fuel and wear:** warps burn fuel (longer jumps and bigger hulls burn more). Bumps, atmosphere entries and jumps wear the hull, and a hull under 50% flies slower. Refuel and repair at any terminal; fuel depots sell the cheapest fuel.
- **Trucking company:** register your own company at any station, buy freighters, hire rookie, veteran or ace pilots and send ships on local runs or long hauls. They earn into the company account in real time, and at half rate for up to 8 hours while the game is closed. Collect earnings, repair worn ships and expand your head office from the station's Fleet tab. Your fleet ships berth at the station pier and show on the departures board.
- **Customs and contraband:** every system with customs has a drive-through customs hall straight ahead of the warp-in point. Fly in, stop on the scale for the scan and leave out the back (or dock at the station) to check in; legal cargo can't be signed for until you do. Settlements post contraband runs (grey goods, restricted, black-market) that pay 1.8–4× but get scanned at customs: comply, try a bribe, or run. A smuggler's compartment helps hide it.
- **Patrols and heat:** patrol cutters hail ships that skipped customs or are wanted, and do random inspections. Run and you're wanted in that system: lose them by outrunning them, diving into an atmosphere or warping out. Heat cools over time or can be paid off at a station.
- **Security levels and pirates:** each system is High, Medium, Low or Lawless security (shown in the warp menu). The lower the security, the fewer patrols, the more raiders and the better black-market pay. Raiders demand a ransom or a crate; run for the station defence grid, an atmosphere or a warp. A deflector shield and decoy flares help. You never lose your ship for good.
- **Pilot needs:** your pilot gets hungry and tired while you play (never while the game is closed). Eat a hot meal at a diner or cantina, carry ration packs (tap the fork on the HUD), and sleep at a motel, a station bunk or in your cab when landed. Sleeping jumps the clock 8 hours, so perishable deadlines keep running. Running on empty slows energy and scans; exhaustion dims the screen, dulls handling and causes microsleeps, and customs fines you for flying over your hours. Galley and sleeper cab modules help on long hauls, fleet pilots take rest breaks, and a relaxed mode in Services turns it all off.
- **Sound:** a cockpit drone, station ambience, warehouse room tone and forklifts at the loading docks, town-square bustle, night crickets and gravel footsteps on foot, landing gear, warp spool-ups, whooshes, landing burns, re-entry roar and hatch sounds from recorded clips, plus an engine, wind and jetpack that follow your throttle and speed, and interface, customs, patrol and raider cues made live with Web Audio. Toggle with the speaker button by the radar.
- **Music:** seven ambient space soundscapes, shuffled with quiet gaps between them, mixed under the game and ducked when danger or sleep takes over. Toggle with the note button under the speaker. The soundtrack (about 11 MB) downloads in the background on first play and is kept for offline play across updates.
- **Graphics:** layered ground materials (soil, sand, rock, snow) blended per pixel with triplanar rock on slopes, wet shorelines, moss-capped rocks and fake contact shadows; height fog with sun glow and haze that hides the world's edge; drifting cloud shadows; denser wind-swept grass that glows when backlit; depth-tinted water with shore foam; rebuilt sky and clouds; planets with continents, coastlines, mountain ridges, swirling cloud bands and city lights on their night side; a smoother star glow; panel-line normals and grime on ships, stations and towns; and a per-planet colour grade, speed blur and edge smoothing in post.
- **Wide systems, pulse drive and autopilot:** worlds sit 15–30K km apart, so a planet-to-planet hop takes about 1–2 minutes. Tap **PULSE** (above the throttle, or P) to light the pulse drive in open space; it's mass-locked near planets, the station and hostiles, burns a little fuel, and drops you out automatically on arrival. Tap the radar (or N) for **System Nav**: pick a planet or the station and the autopilot turns, pulses, drops out and lines you up over the town you're delivering to (or docks you at the station). Any stick input takes back control. Raiders can interdict you mid-pulse. Inside a planet's atmosphere, tap the radar for the planet map and tap a town or outpost: the autopilot cruises there (no boost), keeps clear of the terrain and sets you down on the pad. The top row, **Back to orbit**, climbs you straight out to space.
- **Delivery routes:** tap a cargo line under your status panel (or any destination in System Nav or the planet map) and the autopilot chains every leg: warp if it's in another system, pulse across, drop into the atmosphere, cruise to the town and land on its pad, or fly in and dock at a station. Raiders and patrols pause the route and hand you control; it resumes once things are quiet. In a customs system you have not checked into, the route flies you through the customs hall first; if you are carrying contraband it asks whether to skip the hall and go straight to the drop. Touching the stick cancels it.
- **CB radio:** other drivers chatter on channel 19: patrol and raider warnings for the system you're in, which station is paying top units, town gossip, and the odd word when you set out or arrive. Toggle it with the CB button.
- **Space stations:** dock by autopilot in a hangar bay; trade, upgrade your ship and pick up contracts.
- **Open planet surfaces:** each planet is about 3 × 3 km, streamed in tiles as you fly (full detail nearby, simpler tiles further out). Where you dive in from orbit decides where you arrive.
- **Settlements:** 1–2 habitable planets per system, each with 2–4 towns (landing pad, cargo terminal, residents); every other planet has 1–2 outposts (mining camps, research outposts, fuel depots). Short-hop contracts run between towns on the same planet.
- **Planet map:** tap the radar (or press M) for a relief map with every town and outpost, your drops, your ship and a waypoint you can set.
- **Procedural galaxy:** warp to seeded star systems with their own star, nebula and planet types (lush, ocean, desert, frozen, scorched, toxic, exotic).
- **Living worlds:** day/night cycle, wildlife that grazes and flees, crystal deposits to mine and sell.
- **Unreal-style rendering:** HDR pipeline with bloom, ACES tonemapping, lens flares, god rays, image-based lighting, shadows, wind-blown grass and eye adaptation.
- **Scales to the device:** Low, High and Epic graphics settings plus automatic dynamic resolution.

Progress (units, cargo, upgrades, current system) is saved in the browser's local storage.

## Sound credits

Music in `audio/music/`: ambient soundscapes 001, 002, 003, 005, 006 and 007 by audiopapkin, and "Space Music Ambient" by freesound_community, from Pixabay under the Pixabay Content License (loudness-matched and re-encoded).

Recorded clips in `audio/` (trimmed, looped and re-encoded for the game) by dragon-studio, freesound_community, wolff-sfx, placidplace, forza1903, u_xg7ssi08yr, miraclei, daviddumaisaudio, arunangshubanerjee and 49053354, from Pixabay under the Pixabay Content License. Everything else is synthesised in code.
