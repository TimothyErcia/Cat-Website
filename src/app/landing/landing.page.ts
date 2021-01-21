import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged  } from 'rxjs/operators';
import { fileURLToPath } from 'url';
import { ApiCollectionService } from '../services/api-collection.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.page.html',
  styleUrls: ['./landing.page.scss'],
})
export class LandingPage implements OnInit {
  @ViewChild('catImage')catImage: ElementRef;
  subjectSearch: Subject<any> = new Subject();

  showHeader: boolean = false;
  loaded: boolean = false;
  isSearching: boolean = false;

  selectedSegment: string = "breeds";
  breedList: any[] = [];
  filterList: any[] = [];
  favouriteList: any[] = [];
  favouriteImage: any[] = [];
  votesList:any[] = [];
  voteImage:any[] = [];

  searchForm: FormGroup;
  constructor(private provider: ApiCollectionService,
              public toastCtrl: ToastController,
              public route: Router,
              public formBuilder: FormBuilder) {
                this.searchForm = this.formBuilder.group({
                  searchInput: ['']
                })
              }

  ngOnInit() {
    this.loadFavourite();
    this.loadVotes();
    this.loadBreed();

    this.subjectSearch
      .pipe(
        debounceTime(500),
        distinctUntilChanged())
      .subscribe((data) => {
        this.filterList = data.filter(breed => {
          return (breed.name.toLowerCase().indexOf(this.searchForm.value.searchInput.toLowerCase()) > -1);
        });
      })
  }

  async loadBreed(){
    this.provider.getAllBreed().subscribe((breed: any) => {
      this.breedList = breed;
      this.filterList = this.breedList;
      this.loaded = true;
    }, error => { this.toastThis(error.error.message, 'toast-danger'); });
  }

  async loadFavourite(){
    this.provider.getAllFavourite().subscribe((favourite: any) => {
      this.favouriteList = favourite;
      this.favouriteList.forEach(favorite => {
        this.provider.getImageById(favorite.image_id).subscribe(image => {
          this.favouriteImage.push(image);
        });
      });
    });
  }

  async loadVotes(){
    this.provider.getAllVotes().subscribe((res: any) => {
      this.votesList = res;
      this.votesList.forEach(votes => {
        this.provider.getImageById(votes.image_id).subscribe(image => {
          this.voteImage.push(image);
        });
      });
    });
  }

  ScrollHeader(event){
    if(event.detail.scrollTop > 15){
      this.showHeader = true;  
      this.isSearching = false;
      this.searchForm.controls['searchInput'].setValue("");
    }
    else{ this.showHeader = false; }
  }

  filter(){
    if(this.searchForm.value.searchInput != ""){
      this.subjectSearch.next(this.filterList);
      this.isSearching = true;
    }
    else{ this.loadBreed(); this.isSearching = false; }
  }

  async toggleVote(id){
    this.provider.toggleVote({
      image_id: id,
      value: 1
    }).subscribe((res: any) => {
      this.toastThis("Successfully added a vote", 'toast-success');
    }, error => { this.toastThis(error.error.message, 'toast-danger'); });
  }

  untoggleFavourite(id){
    this.provider.untoggleFavourite(id).subscribe(res => {
      this.toastThis("Favourite removed", 'toast-success');
    }, error => { this.toastThis(error.error.message, 'toast-danger'); });
  }

  untoggleVote(id){
    this.provider.untoggleVote(id).subscribe(res => {
      this.toastThis("Vote removed", 'toast-success');
    }, error => { this.toastThis(error.error.message, 'toast-danger'); });
  }

  openUploadPromt(){
    this.catImage.nativeElement.click();
  }
  openWebOptions(event){
    let chosenImage: File = event.target.files[0];
    let file = new FileReader;
    file.readAsDataURL(chosenImage);
    file.onload = () => {
      //preview of the image
    }
    this.provider.uploadImage(chosenImage).subscribe((res) => {
      this.toastThis("Successfully Uploaded image", 'toast-success');
    }, error => { this.toastThis(error.error.message, 'toast-danger'); console.log(error); });
  }

  async toastThis(message, type){
    const toast = await this.toastCtrl.create({
      message: message,
      mode: 'md',
      duration: 5000,
      position: 'top',
      cssClass: type
    });
    toast.present();
  }

  toDetail(id){
    this.route.navigate(['/breed-detail/'+id]);
    this.isSearching = false;
    this.searchForm.controls['searchInput'].setValue("");
  }

}
