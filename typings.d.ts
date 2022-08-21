export interface Movie{
    _id: string,
    releaseDate: string,
    title: string,
    popularity: string,
    comment: Comment[],
    castMembers: CastMember[],
    crewMembers: CrewMember[]
    overview: {

    },
    poster: {
        asset: {
            url: string
        }
    },
    slug: {
        current: string,
    }
    body: [object]
}


export interface Comment{
    approved: boolean,
    comment: string,
    name: string,
    movie: {
        _ref: string,
        _type: string,
    },
    _createdAt: string,
    _id :string,
    _rev: string,
    _type: string,
    _updatedAt: string
}


export interface CastMember {
    characterName: string,
    externalId: number,
    person: Person
}

export interface CrewMember {
    department: string,
    job: string,
    person: Person,
    externalId: number

}


export interface Person {
    name: string,
    slug: string,
    image: {
        asset: {
            _ref: string
        }
    }
}