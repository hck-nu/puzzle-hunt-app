import PlayerEndpoints from "./endpoints/player";
import PuzzleEndpoints from "./endpoints/puzzle";
import TeamEndpoints from "./endpoints/team";

export default Object.assign(
  {},
  PuzzleEndpoints,
  PlayerEndpoints,
  TeamEndpoints
);
