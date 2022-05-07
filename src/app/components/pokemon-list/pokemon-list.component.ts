import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { forkJoin, Observable } from 'rxjs';
import { PokemonService } from '../../services/pokemon.service';
import { PokemonDetailComponent } from '../pokemon-detail/pokemon-detail.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {

  search: FormControl = new FormControl('');
  pokemons = [];
  tableDataCount: any;
  pageSizeOptions: [10, 20, 50];

  private offset: number;
  isLoading = false;

  searchPokemon: any;
  totalPokemonCount = 0;
  className: string;
  isSearching = false;

  constructor(private pokemonService: PokemonService,
              private bottomSheet: MatBottomSheet,
              private snackBar: MatSnackBar) {
                this.offset = 0 ;
              }

  ngOnInit(): void {
    this.getPage(0, 20);
  }
  getPageDetails(event: any): void {
    this.getPage(event.pageIndex, event.pageSize);
  }

  getPage(offset: number, limit: number): any {
   
      this.isLoading = true;
      this.pokemonService.getPokemonList(offset * limit, limit)
      .subscribe((list: any) => {
        this.tableDataCount = list?.count;
        this.getPokemon(list);
       });
   }

  onSearchPokemon(): void {
    let value = this.search.value;
    value = value.toLowerCase();
    if (value === '') {
      this.isSearching = false;
    } else {
      this.isSearching = true;
      this.isLoading = true;
      this.pokemonService.getPokemonDetail(value)
      .subscribe((pokemon: any) => {
        this.searchPokemon = pokemon;
        this.className = this.searchPokemon.types[0].type.name;
        this.isLoading = false;
      }, (error: any) => {
        this.isLoading = false;
        if (error.status === 404) {
          this.snackBar.open('Sorry, Pokemon not Found', 'OK', {
            duration: 5000,
          });
        }
      });
    }
  }



  private getPokemon(list): any {
    const arr: Observable<any>[] = [];
    list?.results.map((value: any) => {
      arr.push(
        this.pokemonService.getPokemonDetail(value.name)
      );
    });

    forkJoin([...arr]).subscribe((pokemons: []) => {
      this.pokemons = pokemons;
      this.isLoading = false;
    });
  }

  getPrincipalType(list: any): any {
    return list[0].type?.name;
  }

  onDetail(pokemon: any): void {
    this.bottomSheet.open(PokemonDetailComponent, {
      data: {pokemon}
    });
  }

}
