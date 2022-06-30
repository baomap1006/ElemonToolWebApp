import { NextApiHandler } from "next";
import { getSession ,getCsrfToken} from "next-auth/react";
import { PrismaAdapter } from "@next-auth/prisma-adapter"
import { getToken } from "next-auth/jwt"

const secret = process.env.SECRETE
const secretHandler: NextApiHandler = async (req, res) => {
  const session = await getSession({ req });
  const csrfToken = await getCsrfToken({ req })
  console.log(session)
  console.log(csrfToken)
  const token = await getToken({ req, secret })
  console.log("JSON Web Token", token)
  if (session) {
    res.end(
      `Welcome to the mega secret VIP club, ${
        session?.user?.email ?? session?.user?.name
      }`
    );
  } else {
    res.statusCode = 403;
    res.end(`Hold on, you are not allowed in here!`);
  }
};

export default secretHandler;