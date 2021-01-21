import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform, ToastController } from '@ionic/angular';
import { ApiCollectionService } from '../services/api-collection.service';

@Component({
  selector: 'app-breed-detail',
  templateUrl: './breed-detail.page.html',
  styleUrls: ['./breed-detail.page.scss'],
})
export class BreedDetailPage implements OnInit {
  @ViewChild('catImage')catImage: ElementRef;

  showHeader: boolean = false;
  loaded: boolean = false;

  breedId: any;
  breedDetail: any;
  breedImage: string;
  selectedSegment: string = "description";
  constructor(private provider: ApiCollectionService,
              public toastCtrl: ToastController,
              public activedRouter: ActivatedRoute,
              public platform: Platform) { }

  ngOnInit() {
    this.breedId = this.activedRouter.snapshot.paramMap.get('breedId');
    this.loadDetail();
    this.selectedSegment = this.platform.width() > 767 ? "statistics" : "description";
  }

  ScrollHeader(event){
    this.showHeader = event.detail.scrollTop > 15 ? true : false;
  }

  async loadDetail(){
    await this.provider.getBreedById(this.breedId).subscribe((res:any) => {
      console.log(res);
      this.breedDetail = res;
      this.loadImage(this.breedDetail.reference_image_id);
      this.loaded = true;
    });
    
  }

  loadImage(id){
    this.provider.getImageById(id).subscribe((image:any) => {
      console.log(image);
      this.breedImage = image.url;
    });
  }

  openLink(link){
    window.open(link, '_blank');
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

  async toggleFavourite(id){
    await this.provider.toggleFavourite({
      image_id: id
    }).subscribe((res:any) => {
      this.toastThis("Successfully added to favourite", 'toast-success');
    }, error => { this.toastThis(error.error.message, 'toast-danger'); });
  }

  async toggleVote(id){
    await this.provider.toggleVote({
      image_id: id,
      value: 1
    }).subscribe((res:any) => {
        this.toastThis("Successfully added a vote", 'toast-success');
    }, error => { this.toastThis(error.error.message, 'toast-danger'); });
  }

}
