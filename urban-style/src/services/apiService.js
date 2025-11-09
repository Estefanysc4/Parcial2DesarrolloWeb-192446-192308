const API_URL = 'https://fakestoreapi.com/products'

export default {
  async getProducts() {
    const res = await fetch(API_URL)
    return await res.json()
  },
  async createProduct(product) {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    return await res.json()
  },
  async updateProduct(id, product) {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product)
    })
    return await res.json()
  },
  async deleteProduct(id) {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' })
  }
}
