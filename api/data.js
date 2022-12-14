import bcrypt from 'bcryptjs'


const data = {
	users: [
		{
		  name: 'Admin',
		  email: 'admin@gmail.com',
		  password: bcrypt.hashSync('06130613'),
		  isAdmin: true,
		},
		{
		  name: 'Metin',
		  email: 'metin@gmail.com',
		  password: bcrypt.hashSync('12301230'),
		  isAdmin: false,
		},
	  ],
	products: [
	  {
		//_id: '1',
		name: 'Jura WE8 Chrome fully automatic coffee machine',
		slug: 'jura-we8-chrome-fully-automatic-coffee-machine',
		category: 'Coffee Machines',
		image: '/images/jura1.jpg', 
		price: 2190,
		countInStock: 10,
		brand: 'Jura',
		rating: 4.5,
		numReviews: 10,
		description: 'Jura WE8 Professional coffee machine is a new addition to the Professional coffee machine range from the world renowned Swiss manufacturer of high-quality coffee machines. The machine is designed mainly for business use and boasts a larger bean container (500 g), larger water containers (3.0 litres) and a larger coffee grounds container (25 portions) than its little brother Jura E8.',
	  },
	  {
		//_id: '2',
		name: 'Jura X6 Dark Inox automatic coffee machine',
		slug: 'jura-x6-dark-inox-automatic-coffee-machine',
		category: 'Coffee Machines',
		image: '/images/jura2.jpg',
		price: 2990,
		countInStock: 20,
		brand: 'Jura',
		rating: 4.0,
		numReviews: 10,
		description: 'The Jura X6 Dark Inox automatic coffee machine prepares excellent espresso and coffee from freshly ground beans with a push of a button.',
	  },
	  {
		//_id: '3',
		name: 'Jura X8 Platinum automatic coffee machine',
		slug: 'jura-x8-platinum-automatic-coffee-machine',
		category: 'Coffee Machines',
		image: '/images/jura3.jpg',
		price: 3490,
		countInStock: 15,
		brand: 'Jura',
		rating: 4.5,
		numReviews: 14,
		description: 'Jura X8 Platinum is an incredibly versatile coffee machine for offices, customer areas and other places where good coffee is in high demand.',
	  },
	  {
		//_id: '4',
		name: 'Jura S8 Fully Automatic Coffee Machine',
		slug: 'jura-s8-fully-automatic-coffee-machine',
		category: 'Coffee Machines',
		image: '/images/jura4.jpg',
		price: 1799,
		countInStock: 5,
		brand: 'Jura',
		rating: 4.5,
		numReviews: 10,
		description: 'The elegant Jura S8 automatic coffee machine with unique design details has a modern touchscreen colour display, which makes it simple to operate. The graphics and animations guide you through each step of the coffee preparation. This is the choice for a true coffee enthusiast! Jura S8 is specially designed for the preparation of speciality coffees with milk and milk foam. You can choose your favourite coffee between 15 different specialities, just by touching the screen. The AromaG3 grinder is even more precise and twice as fast, yet preserves all the delicious aroma of the coffee beans. ',
	  },
	],
  };
  export default data;