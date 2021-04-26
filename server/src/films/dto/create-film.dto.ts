export class CreateFilmDto {
  readonly name: string
  readonly language: string
  readonly description: string
  readonly genre: string[]
  readonly publish_date: string
  readonly authorParam: author
  readonly cast: string
  // readonly cast: cast[]
  readonly price: number
  readonly category: string[]
  readonly tags: string[]
  readonly time: string
}

class cast {
  readonly role: string
  readonly acter: string
  readonly picture: any[]
}

class acter {
  readonly name: string
}

class author{
  readonly name: string
  readonly picture: []
}
