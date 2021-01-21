import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ApiCollectionService } from '../services/api-collection.service';

@Component({
  selector: 'app-search-detail',
  templateUrl: './search-detail.page.html',
  styleUrls: ['./search-detail.page.scss'],
})
export class SearchDetailPage implements OnInit {

  breedList:any[] = [];
  filterList:any[] = [];
  searchForm: FormGroup;
  subjectSearch: Subject<any> = new Subject();
  constructor(private provider: ApiCollectionService,
              public route: Router,
              public formBuilder: FormBuilder) {
                this.searchForm = this.formBuilder.group({
                  searchInput: ['']
                });
              }

    ngOnInit() {
      this.loadBreed();

      this.subjectSearch
      .pipe(
        debounceTime(1000),
        distinctUntilChanged())
      .subscribe((data) => {
        this.breedList = data.filter(breed => {
          return (breed.name.toLowerCase().indexOf(this.searchForm.value.searchInput.toLowerCase()) > -1);
        });
      })
    }

    async loadVotes(){
      this.provider.getAllVotes().subscribe((res: any) => {
        console.log(res);
      });
    }

    async loadBreed(){
      this.provider.getAllBreed().subscribe((breed: any) => {
        this.breedList = breed;
        this.filterList = this.breedList;
      });
    }

    filter(){
      if(this.searchForm.value.searchInput != ""){
        this.subjectSearch.next(this.filterList);
      }
      else{ this.loadBreed(); }
    }

    toDetail(id){
      this.route.navigate(['/breed-detail/'+id]);
    }

}
