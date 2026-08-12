// Only the photographs the storefront actually renders. Anything exported
// here is emitted into the production bundle whether a component uses it or
// not, which is how 61 MB of unused camera-original JPEGs ended up shipping.
//
// The .jpg masters and the full set of .webp conversions both stay in this
// folder. To use another photo, run `npm run images` and add a line here.
import moss1 from './moss1.webp';
import moss3 from './moss3.webp';
import moss8 from './moss8.webp';
import moss5 from './moss5.webp';
import moss7 from './moss7.webp';
import product1 from './product1.webp';
import product2 from './product2.webp';
import product3 from './product3.webp';
import product4 from './product4.webp';

export {
  moss1,
  moss3,
  moss8,
  moss5,
  moss7,
  product1,
  product2,
  product3,
  product4,
};
