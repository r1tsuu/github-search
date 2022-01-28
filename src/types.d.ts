interface HeaderProps {
  currentMode: string
  setCurrentMode: React.Dispatch<React.SetStateAction<string>>
}

type UserSearchType = {
  login: string
  avatar_url: string

}

type ResponseSearchType = {
  items: UserSearchType[]

}

interface MySearchProps {
  onSearch: (searchValue:string) => void
}

interface MyListItemProps {
  users: UserSearchType[]
  onUserSelect: (username: string) => any
}

interface MyItemProps {
  user: UserSearchType
  onUserSelect: (username: string) => any
}

interface MyUserInfoProps {
  login: string
}

type User = {
  login: string,
  id: number,
  avatar_url: string,
  html_url: string,
  followers: number,
  following: number,
}

interface MyUserInfoCardProps {
  user: User
}
