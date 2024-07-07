import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GithubUser } from "@/models/GithubUser";

interface Props {
  user: GithubUser;
}

const ListItem = ({ user }: Props) => {
  return (
    <li className="flex items-center gap-4 p-2 w-full">
      <Avatar>
        <AvatarImage src={user.avatar_url} alt={user.login} />
        <AvatarFallback>{user.login[0]}</AvatarFallback>
      </Avatar>

      <div>
        <h4>{user.login}</h4>
        <Badge>{user.type}</Badge>
      </div>

      <Button variant="outline" className="ml-auto p-2 h-auto leading-none">
        Learn more
      </Button>
    </li>
  );
};

export default ListItem;
