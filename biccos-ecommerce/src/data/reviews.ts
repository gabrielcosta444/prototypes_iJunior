import type { Review } from '../types/catalog'

export const reviews: Review[] = [
  {
    id: 'paula-ferraz',
    author: 'Paula Ferraz',
    role: 'cliente verificada',
    rating: 5,
    title: 'Saudável com gosto de quero mais',
    body: 'Como pode um lanchinho tão simples ser tão gostoso? Virou meu companheiro das tardes corridas.',
    product: 'Páprica',
    initials: 'PF',
  },
  {
    id: 'lucas-nascimento',
    author: 'Lucas Nascimento',
    role: 'cliente verificado',
    rating: 5,
    title: 'Até quem não ama grão-de-bico',
    body: 'Eu não curtia grão-de-bico na salada, mas crocante e temperadinho assim é outra história.',
    product: 'Cebola & Salsa',
    initials: 'LN',
  },
  {
    id: 'bruna-stancioli',
    author: 'Bruna Stancioli',
    role: 'cliente verificada',
    rating: 5,
    title: 'Finalmente um snack salgado',
    body: 'Vai do estágio para a faculdade dentro da bolsa e resolve a fome sem cair em mais uma barrinha doce.',
    product: 'Kit Descoberta',
    initials: 'BS',
  },
]
