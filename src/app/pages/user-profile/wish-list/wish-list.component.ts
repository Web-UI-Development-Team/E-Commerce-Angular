import { Component, Input } from '@angular/core';
import { CartService } from '../../../services/cart/cart.service';
import { ICart } from '../../../../modles/cart.modle';
import { UserProfileRequestService } from '../../../services/user-profile/user-profile.request.service';
import { IWishlist } from '../../../../modles/profile.modle';
import { IProduct } from '../../../../modles/product.modle';
import { UserProfileService } from '../../../services/user-profile/user-profile.service';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.css'
})
export class WishListComponent {
  constructor(private userProfileService: UserProfileService) {}

  @Input() wishList: IProduct[];

  ngOnInit() {
    if(!this.wishList)
    {
      this.userProfileService.getWishlist();
      this.wishList = this.userProfileService.wishList;
    } else {
      this.wishList = this.userProfileService.wishList;
    }
  }

  onClickRemove() {
  }

  onClickHeartIcon() {
  }
}
