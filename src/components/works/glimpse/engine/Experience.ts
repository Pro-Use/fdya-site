import { GameEntity } from "./GameEntity";
import { Engine } from "./Engine";
import { Resource } from "./Resources";
import type { ResourceMap } from "../world";

export type ExperienceConstructor = new (
  engine: Engine,
  resource: ResourceMap
) => Experience;
export interface Experience extends GameEntity {
  init(): void;
  resources: Resource[];
  reset(): void;
}
