import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SERVER_URL } from './config';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': 'c1ba8ec8-553d-44f5-b422-8dc8106781db'
  })
};

const getAllBreedsURL = SERVER_URL + '/breeds?limit=12',
      getBreedByIdURL = SERVER_URL + '/breeds/',

      getAllVotesURL = SERVER_URL + '/votes',
      getVoteByIdURL = SERVER_URL + '/votes/',
      selectVoteURL = SERVER_URL + '/votes',
      removeVoteByIdURL = SERVER_URL + '/votes/',

      getAllFavouriteURL = SERVER_URL + '/favourites',
      getFavouriteByIdURL = SERVER_URL + '/favourites/',
      selectFavouriteURL = SERVER_URL + '/favourites',
      removeFavouriteByIdURL = SERVER_URL + '/favourites/',

      uploadImageURL = SERVER_URL + '/images/upload',
      getImageByCategoryURL = SERVER_URL + '/images/search/?size=full&category_ids=',
      getImageByBreedURL = SERVER_URL + '/images/search/?size=full&breed_ids=',
      getImageByIdURL = SERVER_URL + '/images/',
      getAllUploadedURL = SERVER_URL + '/images/',

      getAllCategoriesURL = SERVER_URL + '/categories',

      getAllSourcesURL = SERVER_URL + '/sources';


@Injectable({
  providedIn: 'root'
})
export class ApiCollectionService {

  constructor(private http: HttpClient) { }

  getAllBreed(): Observable<any>{
    return this.http.get(getAllBreedsURL, httpOptions);
  }

  getBreedById(id): Observable<any>{
    return this.http.get(getBreedByIdURL+id, httpOptions);
  }

  getAllVotes(): Observable<any>{
    return this.http.get(getAllVotesURL, httpOptions);
  }

  getVotesById(id): Observable<any>{
    return this.http.get(getVoteByIdURL, httpOptions);
  }

  toggleVote(data): Observable<any>{
    return this.http.post(selectVoteURL, data, httpOptions);
  }

  untoggleVote(id): Observable<any>{
    return this.http.delete(removeVoteByIdURL+id, httpOptions);
  }

  getAllFavourite(): Observable<any>{
    return this.http.get(getAllFavouriteURL, httpOptions);
  }

  getFavourite(id): Observable<any>{
    return this.http.get(getFavouriteByIdURL+id, httpOptions);
  }

  toggleFavourite(data): Observable<any>{
    return this.http.post(selectFavouriteURL, data, httpOptions);
  }

  untoggleFavourite(id): Observable<any>{
    return this.http.delete(removeFavouriteByIdURL+id, httpOptions);
  }

  getAllCategories(): Observable<any>{
    return this.http.get(getAllCategoriesURL, httpOptions);
  }

  getAllSource(): Observable<any>{
    return this.http.get(getAllSourcesURL, httpOptions);
  }

  uploadImage(file){
    let options = {
      headers: new HttpHeaders({
        'x-api-key': 'c1ba8ec8-553d-44f5-b422-8dc8106781db'
      })
    }
    let body = new FormData();
    body.append("file", file, file.name);
    return this.http.post(uploadImageURL, body, options);
  }

  getAllUploadedImg(data): Observable<any>{
    return this.http.get(getAllUploadedURL+data, httpOptions)
  }

  getImageByCategory(id): Observable<any>{
    return this.http.get(getImageByCategoryURL+id, httpOptions);
  }

  getImageByBreed(id): Observable<any>{
    return this.http.get(getImageByBreedURL+id, httpOptions);
  }

  getImageById(id): Observable<any>{
    return this.http.get(getImageByIdURL+id, httpOptions);
  }
  
}
