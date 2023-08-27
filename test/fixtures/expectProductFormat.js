export const expectProductFormat = {
  name: expect.any(String),
  description: expect.any(String),
  thumbnail: expect.any(String),
  value: expect.any(Number),
  category: expect.any(String),
  keywords: expect.any(Array),
  stock: expect.any(Number),
  id: expect.any(String)
}
