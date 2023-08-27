import { user } from './index.js'

export const transaction = {
  address: {
    firstName: 'test',
    lastName: 'demo',
    address1: 'VICENTE GUERRERO 4',
    phoneNumber: '5623232323',
    countryRegion: 'Mexico',
    zip: '09420',
    state: 'Ciudad de Mexico',
    locality: 'Iztapalapa',
    sublocality: 'APATLACO'
  },
  delivery: {
    status: 'PROGRESS',
    date: 'Thu Aug 31 2023 00:22:48 GMT-0500 (hora de verano central)'
  },
  order_id: '2LH77588EN0313335',
  status: 'complete',
  amount: 923.46,
  buyer_email: user.email,
  list_products: [
    {
      name: 'Micrófonos Compatibles Con Galaxy S10 /s10 Edge /s10 Plus',
      thumbnail: 'https://res.cloudinary.com/dsnsomt1k/image/upload/v1689804793/GeekMobile-display-components-samsumg-microfono.webp',
      quantity: 1,
      value: 145.5,
      description: 'Los micrófonos compatibles con Galaxy S10, S10 Edge y S10 Plus son la elección perfecta para aquellos que desean mejorar la calidad de grabación de audio en sus dispositivos Samsung. Diseñados específicamente para ser compatibles con estos modelos, estos micrófonos ofrecen un rendimiento excepcional y una captura de sonido clara y nítida. Con estos micrófonos, podrás disfrutar de una experiencia de grabación de audio de alta calidad en tu Galaxy S10.',
      category: 'COMPONENTS',
      id_product: '64b860e477d2a498996b38d3'
    },
    {
      name: 'Display Samsumg A04 | Pantalla Smg A04 Calidad Original',
      thumbnail: 'https://res.cloudinary.com/dsnsomt1k/image/upload/v1689800732/GeekMoible-display-components-samsumg-A04.webp',
      quantity: 2,
      value: 388.98,
      description: 'El Display Samsung A04 es una pantalla de calidad original diseñada específicamente para el modelo Samsung A04. Si necesitas reemplazar la pantalla dañada de tu dispositivo, esta opción es perfecta para ti. Con esta pantalla de calidad original, podrás disfrutar de una experiencia visual excepcional en tu Samsung A04. La pantalla ofrece colores vibrantes, imágenes nítidas y una resolución precisa para que puedas disfrutar al máximo de tus aplicaciones, videos y juegos favoritos.',
      category: 'COMPONENTS',
      id_product: '64b850ee77d2a498996b38c7'
    }
  ],
  net_amout: 876.53,
  payer_id: 'MLEEF2V5FPYAG',
  transaccion_id: '8SB84448VW821100D'
}
