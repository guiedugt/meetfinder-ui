import { takeLatest, all } from 'redux-saga/effects';

declare global {
  interface Action {
    (payload: any): {
      type: string;
      payload: object;
    };
  }

  interface ActionResult {
    type: string;
    payload: any;
  }

  interface Reducer<State> {
    [key: string]: (state: State, action: ActionResult) => State;
  }

  interface Sagas {
    [key: string]: (action: ActionResult) => void;
  }
}

interface ReducerHandlers<State> {
  [key: string]: (state: State, action: ActionResult) => State;
}

interface SagasHandlers {
  [key: string]: (action: ActionResult) => void;
}

function createModule<State>(
  name: string,
  initialState: State,
  reducerHandlers: ReducerHandlers<State>,
  sagasHandlers: SagasHandlers,
) {
  const types: { [key: string]: string } = Object.keys(reducerHandlers).reduce(
    (acc, cur) => ({
      ...acc,
      [cur]: `${name}/${cur}`,
    }),
    {},
  );

  const actions: { [key: string]: Action } = Object.entries(types).reduce(
    (acc, cur) => ({
      ...acc,
      [cur[0]]: (payload: any) => ({ payload, type: cur[1] }),
    }),
    {},
  );

  const reducer: any = (state: State = initialState, action: ActionResult) => {
    const actionHandlers = Object.entries(reducerHandlers)
      .reduce((acc, cur) => ({ ...acc, [types[cur[0]]]: cur[1] }), {});

    return actionHandlers.hasOwnProperty(action.type)
      ? actionHandlers[action.type](state, action) || state
      : state;
  };

  let sagas: { [key: string]: (action: ActionResult) => void } = {};
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
