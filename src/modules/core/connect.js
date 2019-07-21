import React from 'react';

export default function makeConnect(Consumer) {
  return (mapToProps, Component) => {
    const { actions: mapDispatchToProps, ...mapStateToProps } =
      mapToProps || {};
    const ConnectedWrapper = React.memo(({ dispatch, ...props }) => {
      const actions = React.useMemo(
        () =>
          Object.entries(mapDispatchToProps || {}).reduce(
            (acc, [key, action]) => {
              acc[key] = payload => dispatch(action(payload));
              return acc;
            },
            {}
          ),
        [dispatch]
      );
      return <Component {...props} actions={actions} />;
    });
    const mapState = Object.entries(mapStateToProps || {});
    return () => (
      <Consumer>
        {({ dispatch, select }) => (
          <ConnectedWrapper
            {...mapState.reduce((acc, [key, selector]) => {
              acc[key] = select(selector);
              return acc;
            }, {})}
            dispatch={dispatch}
          />
        )}
      </Consumer>
    );
  };
}
