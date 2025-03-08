import "./App.css";
import { AppRouter } from "./AppRouter/AppRouter";
import { Route } from "./AppRouter/components/route";
import Channel from "./routes/channel/channel";
import DoubleNesting from "./routes/channel/nesting/doublenesting";
import Nested from "./routes/channel/nesting/nested";
import Sub from "./routes/channel/sub";
import Home from "./routes/home/home";
import Watch from "./routes/watch/watch";

const tempAction = async (): Promise<string> => {
  return await new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done fetching");
    }, 2500);
  });
};

function App() {
  return (
    <AppRouter>
      <Route element={<Home />} path='/' action={tempAction} />
      <Route element={<Watch />} path='/watch' action={tempAction} />
      <Route element={<Channel />} path='/channel/:channel'>
        <Route element={<Sub />} path='/content' index>
          <Route element={<Nested />} path='/nested'>
            <Route element={<DoubleNesting />} path='/:so-nested' />
          </Route>
        </Route>
      </Route>
    </AppRouter>
  );
}

export default App;
