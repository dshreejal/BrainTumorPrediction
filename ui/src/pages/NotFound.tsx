import React, { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface NotFoundProps {}

const NotFound: FC<NotFoundProps> = ({}) => {
  return (
    <div>
      NotFound
      <Link to="/">
        <Button>Go Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
