import { Component, Inject, OnInit } from '@angular/core';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit {

  pokemon: any;

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: any) {
    this.pokemon = data.pokemon;
  }

  ngOnInit(): void {
  }


  getAbilities(): string {
    return this.pokemon.abilities.map(x => x.ability.name).join(', ');
  }
  leadingZeros(str: string | number, size = 3): string {
    let s = String(str);
    while (s.length < (size || 2)) {
      s = '0' + s;
    }
    return s;
  }

  getPrincipalType(list: any[]): any {
    return list.filter(x => x.slot === 1)[0]?.type.name;
  }

}
