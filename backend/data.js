import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'Javi',
      email: 'javi@mariscoslaparada.es',
      password: bcrypt.hashAsync('1234', 5),
      isAdmin: true,
    },
    {
      name: 'Paco',
      email: 'paco@mariscoslaparada.es',
      password: bcrypt.hashAsync('1234', 5),
      isAdmin: false,
    },
  ],
  products: [
    {
      _id: '1',
      name: 'Huevas',
      category: 'Pescado',
      image: '/images/hueva.jpg',
      price: 12,
      stock: 80.5,
      stockLimit: 5,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiu optio, eaque rerum!',
    },
    {
      _id: '2',
      name: 'Cigalas',
      category: 'Marisco',
      image: '/images/cigala.jpeg',
      price: 23,
      stock: 80.5,
      stockLimit: 5,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiu optio, eaque rerum!',
    },
    {
      _id: '3',
      name: 'Gambas',
      category: 'Marisco',
      image: '/images/gamba.jpg',
      price: 25,
      stock: 57,
      stockLimit: 5,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiu optio, eaque rerum!',
    },
    {
      _id: '4',
      name: 'Gambones',
      category: 'Marisco',
      image: '/images/gambon.jpeg',
      price: 12.95,
      stock: 80.5,
      stockLimit: 5,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiu optio, eaque rerum!',
    },
    {
      _id: '5',
      name: 'Atún',
      category: 'Pescado',
      image: '/images/atun.jpg',
      price: 12,
      stock: 80.5,
      stockLimit: 5,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiu optio, eaque rerum!',
    },
    {
      _id: '6',
      name: 'Pulpo',
      category: 'Pescado',
      image: '/images/pulpo.jpg',
      price: 7.95,
      stock: 80.5,
      stockLimit: 5,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiu optio, eaque rerum!',
    },
    {
      _id: '7',
      name: 'Pescado',
      category: 'Pescado',
      image: '/images/pescado.jpeg',
      price: 8.95,
      stock: 80.5,
      stockLimit: 5,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentiu optio, eaque rerum!',
    },
  ],
};
export default data;
