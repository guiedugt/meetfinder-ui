import { takeLatest, all } from 'redux-saga/effects';

declare global {
  interface IAction {
    (payload?: any): {
      type: string;
      payload?: any;
    };
  }

  interface IActionResult {
    type: string;
    payload: any;
  }

  interface IReducer<State> {
    [key: string]: (state: State, action: IActionResult) => State;
  }

  interface ISagas {
    [key: string]: (action: IActionResult) => void;
  }
}

interface IReducerHandlers<State> {
  [key: string]: (state: State, action: IActionResult) => State;
}

interface ISagasHandlers {
  [key: string]: (action: IActionResult) => void;
}

function createModule<State>(
  name: string,
  initialState: State,
  reducerHandlers: IReducerHandlers<State>,
  sagasHandlers: ISagasHandlers,
) {
  const types: { [key: string]: string } = Object.keys(reducerHandlers).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: `${name}/${cur}`,
    }),
    {},
  );

  const actions: { [key: string]: IAction } = Object.entries(types).reduce(
    (acc, cur) => ({
      ...acc,
      [cur[0]]: (payload: any) => ({ payload, type: cur[1] }),
    }),
    {},
  );

  const reducer: any = (state: State = initialState, action: IActionResult) => {
    const actionHandlers = Object.entries(reducerHandlers)
      .reduce((acc, cur) => ({ ...acc, [types[cur[0]]]: cur[1] }), {});

    return actionHandlers.hasOwnProperty(action.type)
      ? actionHandlers[action.type](state, action) || state
      : state;
  };

  let sagas: { [key: string]: (action: IActionResult) => void } = {};
  let watchers: any = [];
  let runSagas: any = null;
  if (!!sagasHandlers) {
    sagas = Object.keys(actions).reduce(
      (acc: { [key: string]: () => void }, cur: string) => ({
        ...acc,
        [cur]: null,
      }),
      {},
    );
    watchers = Object.entries(types).map(([fn, type]: any) =>
      function* () {
        if (!sagasHandlers[fn]) throw new Error(`${fn} saga not defined`);
        yield takeLatest(type, sagasHandlers[fn]);
      },
    );

    runSagas = function* () {
      const runWatchers = () => watchers.map(watcher => watcher());
      yield all(runWatchers());
    };
  }

  return {
    types,
    actions,
    reducer,
    sagas,
    watchers,
    runSagas,
  };
}

export default createModule;
