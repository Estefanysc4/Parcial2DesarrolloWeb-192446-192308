const API_URL = 'https://fakestoreapi.com/products'


// Tasa aproximada USD → COP
const EXCHANGE_RATE_COP = 4700


function formatCOP(amount) {
try {
return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount)
} catch (e) {
return `COP ${amount.toLocaleString()}`
}
}


export default {
async getProducts() {
const res = await fetch(API_URL)
if (!res.ok) throw new Error('Error al obtener productos')
const data = await res.json()


const mapped = data.map((p) => {
const priceCOP = Math.round(p.price * EXCHANGE_RATE_COP)
return {
...p,
priceCOP,
priceFormatted: formatCOP(priceCOP),
localImage: null
}
})


return mapped
},


async deleteProduct(id) {
await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
}
}