import { Component } from '@angular/core';

interface Catagery {
  value: string;
  viewValue: string;
}
interface Location {
  value: string;
  viewValue: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  selected = 'thrissur-0';

  Catagery: Catagery[] = [
    {value: 'a1', viewValue: 'Vegitables & Fruits'},
    {value: 'a2', viewValue: 'Home Made Items'},
    {value: 'a3', viewValue: 'Homely Animals'},
  ];


  Location: Location[] = [
    {value: 'thrissur-0', viewValue: 'Thrissur'},
    {value: 'eranakulam-1', viewValue: 'eranakulam'},
    {value: 'kozhikode-2', viewValue: 'kozhikode'},
  ];

  Vegitables = [
    {
      url: 'https://chilliworkshop.co.uk/wp-content/uploads/2021/12/Hand-holding-green-Chillies-1.gif',
      name: 'Sambar Mulak',
      Negotiable: 'Negotiable',
      desc: 'Organic pachamulak from thrissur',
      price: 70
    },
    {
      url: 'https://img.etimg.com/thumb/width-640,height-480,imgsize-89024,resizemode-75,msid-102027582/news/india/tomato-prices-to-go-down-following-new-crop-arrival-from-maharashtra-mp-government/tomatoes.jpg',
      name: 'Tomato',
      Negotiable: 'Fixed Rate',
      desc: 'organic Tomato from thrissur.',
      price: 25
    }, 
    {
      url: 'https://www.pothunalam.com/wp-content/uploads/2018/11/curry-leaves.jpg',
      name: 'Kariveppila',
      Negotiable: 'Fixed Rate',
      desc: 'organic Kariveppila from thrissur',
      price: 10
    }, 
    {
      url: 'https://post.healthline.com/wp-content/uploads/2020/08/rambutan-732x549-thumbnail-732x549.jpg',
      name: 'Rambootan',
      Negotiable: 'Fixed Rate',
      desc: 'organic rambootan from thrissur',
      price: 125
    }
  ]

  hommade = [
    {
      url: 'https://5.imimg.com/data5/QK/LH/PX/SELLER-14193979/varma-s-foods-tender-mango-kadumanga-500x500.jpg',
      name: 'Kadumanga Pickle',
      Negotiable: 'Negotiable',
      desc: 'Home made Kadumanga from thrissur',
      price: 115
    },
    {
      url: 'https://i.ytimg.com/vi/_DuFE9jgAVA/maxresdefault.jpg',
      name: 'Kappa varuthath',
      Negotiable: 'Fixed Rate',
      desc: 'Home make Kappa varuthath from .',
      price: 25
    }, 
    {
      url: 'https://pic.warmoven.in/catalog/product/cache/4e14bcb566d25893ae7201d4dbdc22fd/image/15380e9/choco-almond-cake.jpg',
      name: 'Cake',
      Negotiable: 'Fixed Rate',
      desc: 'Home made Cake from thrissur',
      price: 225
    }, 
    {
      url: 'https://i.ytimg.com/vi/161i_z6rbW0/maxresdefault.jpg',
      name: 'Kachiya Enna',
      Negotiable: 'Fixed Rate',
      desc: 'Home made Herbal Oil',
      price: 175
    }, 
    {
      url: 'https://5.imimg.com/data5/SELLER/Default/2021/4/DM/ZH/AC/86981091/brown-eggs3-jpg-500x500.jpg',
      name: 'Nadan Kozhi Mutta',
      Negotiable: 'Fixed Rate',
      desc: 'Nadan Mutta from thrissur',
      price: 175
    }, 
  ]
}
