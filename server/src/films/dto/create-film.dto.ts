export class CreateFilmDto {
  readonly name: string
  readonly language: string
  readonly description: string
  // readonly genre: string[]
  readonly publish_date: string
  readonly authorParam: author
  readonly cast: cast[]
  readonly price: number
  readonly categoryName: string[]
  readonly tags: string[]
}

class cast {
  readonly role: string
  readonly acter: acter
}

class category{
  readonly name: string
}
class acter {
  readonly name: string
}

class author{
  readonly name: string
  readonly picture: string
}
