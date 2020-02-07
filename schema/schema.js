const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLString, GraphQLBoolean, GraphQLList, GraphQLSchema } = graphql

let tiendas = [
    { id: '1', name: 'tienda patito', tipoTienda: 'insumos', productoId: '2' },
    { id: '2', name: 'deposhop', tipoTienda: 'deportiva', productoId: '3' },
    { id: '3', name: 'super mark', tipoTienda: 'insumos', productoId: '1' },
    { id: '4', name: 'game planet', tipoTienda: 'video juegos', productoId: '4' }
];

let productos = [
    { id: '1', name: 'Huevos', cantidad: '120', existencia: true, fechaVencimiento: '2021' },
    { id: '2', name: 'Leche', cantidad: '80', existencia: true, fechaVencimiento: '2021' },
    { id: '3', name: 'Tenis Adidas', cantidad: '50', existencia: true, fechaVencimiento: '0' },
    { id: '4', name: 'Fifa 2020', cantidad: '0', existencia: false, fechaVencimiento: '2021' },
];

let almacenes = [
    { id: '1', direccion: 'av. pepito #1126', capacidad: '800', activo: true },
    { id: '2', direccion: 'av. los angeles #256', capacidad: '1200', activo: true },
    { id: '3', direccion: 'Carrizal #145', capacidad: '600', activo: true },
    { id: '4', direccion: 'los guacamayos #698', capacidad: '1500', activo: true },
];

const TiendaType = new GraphQLObjectType({
    name: 'Tienda',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        tipoTienda: { type: GraphQLString },
        productoId: {
            type: ProductoType,
            resolve(parent, args) {
                return productos.find(producto => producto.id === parent.productoId)
            }
        }
    })
})

const ProductoType = new GraphQLObjectType({
    name: 'Producto',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        cantidad: { type: GraphQLInt },
        existencia: { type: GraphQLBoolean },
        fechaVencimiento: { type: GraphQLString },
        producto: {
            type: new GraphQLList(TiendaType),
            resolve(parent, args) {
                return tiendas.filter(tienda => tienda.productoId === parent.id)
            }
        }
    })
})

const AlmacenType = new GraphQLObjectType({
    name: 'Almacen',
    fields: () => ({
        id: { type: GraphQLID },
        direccion: { type: GraphQLString },
        capacidad: { type: GraphQLInt },
        activo: { type: GraphQLBoolean }

    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        tienda: {
            type: TiendaType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return tiendas.find(tienda => tienda.id === args.id)
            }
        },
        tiendas: {
            type: new GraphQLList(TiendaType),
            resolve(parent, args) {
                return tiendas
            }
        },
        producto: {
            type: ProductoType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return productos.find(producto => producto.id === args.id)
            }
        },
        productos: {
            type: new GraphQLList(ProductoType),
            resolve(parent, args) {
                return productos
            }
        },
        almacen: {
            type: AlmacenType,
            args: {
                id: { type: GraphQLID }
            },
            resolve(parent, args) {
                return almacenes.find(almacen => almacen.id === args.id)
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery
})