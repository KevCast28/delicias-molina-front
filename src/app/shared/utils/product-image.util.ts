export function getProductImage(categoryName: string): string {
  switch (categoryName.toLowerCase()) {
    case 'brownies':
      return 'images/brownie.jpg';

    case 'muffins':
      return 'images/muffin.jpg';

    case 'pasteles':
      return 'images/pastel.jpg';

    default:
      return 'images/placeholder.jpg';
  }
}
