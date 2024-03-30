import { Component, Input } from '@angular/core';
import { IProduct } from '../../../../../modles/product.modle';
import { UserProfileService } from '../../../../services/user-profile/user-profile.service';

@Component({
  selector: 'app-wish-list-item',
  templateUrl: './wish-list-item.component.html',
  styleUrl: './wish-list-item.component.css'
})
export class WishListItemComponent {

  @Input() product: IProduct

  constructor(private userProfileService: UserProfileService) {}

  isQuantityEdited: boolean = false;
  buttonStyle: string = '';

  ngOnInit() {
  }

  onClickRemove() {
    const index = this.userProfileService.wishList.findIndex(
      (item) => item._id === this.product._id
    );

    this.userProfileService.removeProductFromWishlist(this.product._id, index);
  }
}
