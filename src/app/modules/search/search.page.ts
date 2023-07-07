import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DressTypeEnum } from 'src/app/shared/enums/DressTypeEnum';
import { NavigationPagesEnum } from 'src/app/shared/enums/NavigationPagesEnum';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
})
export class SearchPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
   * Go to "Outfit" page
   */
  goToOutfit() {
    this.router.navigateByUrl(NavigationPagesEnum.OUTFIT);
  }

  /**
   * Go to "Clothes" page
   */
  goToClothes() {
    this.router.navigate([NavigationPagesEnum.DRESSES], {
      queryParams: {
        dressType: DressTypeEnum.CLOTHES,
      },
    });
  }

  /**
   * Go to "Accessories" page
   */
  goToAccessories() {
    this.router.navigate([NavigationPagesEnum.DRESSES], {
      queryParams: {
        dressType: DressTypeEnum.ACCESSORIES,
      },
    });
  }

  /**
   * Go to "Shoes" page
   */
  goToShoes() {
    this.router.navigate([NavigationPagesEnum.DRESSES], {
      queryParams: {
        dressType: DressTypeEnum.SHOES,
      },
    });
  }

}
