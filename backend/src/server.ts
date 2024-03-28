import app from "./app";
import { env } from "./utils/validateEnv";

const PORT = env.PORT;

app.listen(PORT, () => {console.log("server running on port " + PORT)});