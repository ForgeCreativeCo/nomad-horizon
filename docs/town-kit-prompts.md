# Town kit: 3D model prompts

Towns grow in rings: a **core** around the landing pad (settlement), **ring 2** of 8 straight blocks round an octagon (town) and **ring 3** of 12 taller blocks (city). Gaps at the corners are filled in code. Every piece below is built in code today; generate a model from its prompt and the game swaps it in.

**To swap one in:** slim the GLB as usual (simplify, resize 1024, jpeg, meshopt), save it in `models/`, set that piece's `url` in `TOWN_KIT` in `index.html` (and `rotY` if the street side of the model doesn't face -Z), and add it to `CORE` in `sw.js`. The game scales it to the footprint below.

**Shared style** (already appended to every prompt below):

> Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

## Town core (settlement)

`core_town` · footprint 100 m × 100 m, about 14 m tall

> A small circular frontier colony town core, seen as one compact cluster about 100 m across: a ring of 1–3 storey prefab habitat blocks, a corrugated quonset warehouse, cylindrical water and fuel tanks, a comms tower with a dish, all arranged in a circle around a large EMPTY round clearing in the exact center (the clearing is about 30 m across and must stay completely empty: the landing pad goes there). Narrow lanes between buildings, cargo containers, street lamps. Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

## Outpost core (mining camp / research post / fuel depot)

`core_outpost` · footprint 76 m × 76 m, about 12 m tall

> A small remote frontier outpost about 75 m across: a few prefab cabins, a quonset shed, fuel tanks, a drill rig or sensor mast, stacked cargo containers and a tall comms mast, loosely arranged in a ring around an EMPTY round clearing in the exact center about 30 m across (the landing pad goes there). Sparse, utilitarian, isolated. Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

## Ring 2 block · housing

`r2_res` · footprint 43 m × 20 m, about 11 m tall

> A straight rectangular city block segment for a frontier colony town, about twice as long as it is deep (43 m × 20 m footprint). A row of 2–4 storey prefab habitat buildings joined by enclosed walkways, rooftop water tanks and air units, small balconies, ground-floor shopfronts with lit signs along ONE long side (the street side), a raised concrete-and-steel foundation slab with a sidewalk along that street-side edge. Both short ends are cut flat and clean so copies can be lined up end to end. Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

## Ring 2 block · industry

`r2_ind` · footprint 43 m × 20 m, about 10 m tall

> A straight rectangular industrial block segment for a frontier colony town, about twice as long as it is deep (43 m × 20 m footprint): a long corrugated quonset warehouse with a roller door, a cluster of cylindrical storage tanks with pipework, a vent stack, stacked shipping containers and a small loading dock, all on a raised concrete-and-steel foundation slab with a sidewalk along ONE long side (the street side). Both short ends cut flat and clean so copies line up end to end. Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

## Ring 2 block · business plot

`r2_plot` · footprint 43 m × 20 m, about 10 m tall

> A straight rectangular city block segment for a frontier colony town, about twice as long as it is deep (43 m × 20 m footprint). One half has a 2–3 storey prefab habitat building; the other half is an EMPTY fenced lot with a flat paved surface (a business building will be placed there later), a few crates and a small site office cabin at the back. Raised concrete-and-steel foundation slab, sidewalk along ONE long side (the street side). Both short ends cut flat and clean. Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

## Ring 3 block · city housing

`r3_res` · footprint 47 m × 24 m, about 16 m tall

> A straight rectangular city block segment for a growing frontier colony city, about twice as long as it is deep (47 m × 24 m footprint): taller 4–6 storey stacked prefab apartment towers of varied heights with lit window bands, sky bridges between them, rooftop antennas, water tanks and landing lights, ground-floor shops and a covered arcade along ONE long side (the street side). Raised foundation slab with a sidewalk on the street side. Both short ends cut flat and clean so copies line up end to end. Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

## Ring 3 block · city industry

`r3_ind` · footprint 47 m × 24 m, about 14 m tall

> A straight rectangular heavy-industry block segment for a frontier colony city, about twice as long as it is deep (47 m × 24 m footprint): a large fabrication hall with a sawtooth roof, a refinery cluster of tanks and pipes, a gantry crane over a container yard, tall exhaust stacks, on a raised concrete-and-steel foundation slab with a sidewalk along ONE long side (the street side). Both short ends cut flat and clean. Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

## Ring 3 block · city business plot

`r3_plot` · footprint 47 m × 24 m, about 14 m tall

> A straight rectangular city block segment for a frontier colony city, about twice as long as it is deep (47 m × 24 m footprint). One half has a 4–5 storey prefab tower; the other half is an EMPTY fenced paved lot (a business building goes there later) with a site office cabin and stacked crates at the back. Raised foundation slab, sidewalk along ONE long side (the street side). Both short ends cut flat and clean. Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

## Business · mining depot (next step)

`biz_mining` · footprint 20 m × 16 m, about 12 m tall · used in the next step (business districts)

> A frontier mining supply depot building about 20 m × 16 m: a rugged prefab warehouse with a big roller door, an ore hopper and conveyor, racks of drill heads and explosive crates behind a hazard fence, a lit sign reading MINING SUPPLY. Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

## Business · farm co-op (next step)

`biz_farm` · footprint 20 m × 16 m, about 9 m tall · used in the next step (business districts)

> A frontier farm co-op building about 20 m × 16 m: a row of glowing hydroponic greenhouse domes, a seed store with a loading door, water tanks and pipes, a lit sign reading FARM CO-OP. Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

## Business · clinic (next step)

`biz_clinic` · footprint 18 m × 14 m, about 9 m tall · used in the next step (business districts)

> A frontier medical clinic about 18 m × 14 m: a clean white two-storey prefab with a green cross sign, a covered ambulance bay, a small rooftop landing pad for a medevac drone. Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

## Business · shipyard (next step)

`biz_shipyard` · footprint 22 m × 18 m, about 14 m tall · used in the next step (business districts)

> A small frontier shipyard about 22 m × 18 m: an open repair bay with a gantry crane over a cradle, stacked hull plates and engine parts, welding scorch marks, a lit sign reading REPAIRS & REFITS. Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

## Business · market / cantina (next step)

`biz_market` · footprint 18 m × 14 m, about 8 m tall · used in the next step (business districts)

> A frontier market and cantina about 18 m × 14 m: covered stalls under patched awnings, a squat bar building with neon signs, string lights, crates of goods, a few stools. Gritty frontier-colony sci-fi, hard-surface, game-ready. Worn sun-bleached white and grey prefab panels with burnt-orange trim stripes, dark gunmetal frames and railings, yellow-and-black hazard striping, dust, rust streaks and scuffs, warm lit window strips. Matches a weathered industrial space-trucking world. One single object, flat bottom resting on the ground, centered, no terrain, no ground plane, no vehicles, no people, no turnaround sheet or multiple views.

