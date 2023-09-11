import { PokemonId, PokemonName } from "../pokemon/Pokemon";

export interface PokemonOption {
  label: PokemonName;
  value: PokemonId;
}
