export const verifyAscendingSort = (array) => {
   const sorted = [...array].sort((a,b)=>a-b)
   expect(array).to.deep.equal(sorted)
}

export const verifyDescendingSort = (array) => {
   const sorted = [...array].sort((a,b)=>b-a)
   expect(array).to.deep.equal(sorted)
}