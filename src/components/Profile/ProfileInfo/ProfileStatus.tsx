import React from "react";

type TProps = {
   updateStatusProfileThunkCreator: (status: string) => void;
   status: string;
};

type TState = {
   editMode: boolean;
   status: string;
};

class ProfileStatus extends React.Component<TProps, TState> {
   state = {
      editMode: false,
      status: this.props.status,
   };

   activateEditMode = () => {
      this.setState({ editMode: true });
      // this.state.editMode = true;
      // this.forceUpdate()
      // console.log(this.state.editMode);
   };

   onStatusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      this.setState({ status: e.currentTarget.value });
   };

   deActivateEditMode = () => {
      this.setState({ editMode: false });
      if (this.props.status !== this.state.status) {
         this.props.updateStatusProfileThunkCreator(this.state.status);
      }
   };

   componentDidUpdate(prevProps: TProps, prevState: TState) {
      if (prevProps.status !== this.props.status) {
         this.setState({
            status: this.props.status,
         });
      }
   }

   render() {
      return (
         <>
            {this.state.editMode ? (
               <div>
                  <input
                     autoFocus
                     onBlur={this.deActivateEditMode}
                     type="text"
                     value={this.state.status}
                     onChange={(e) => this.onStatusChange(e)}
                  />
               </div>
            ) : (
               <div>
                  <span onDoubleClick={this.activateEditMode}>
                     {this.props.status || "статус не указан"}
                  </span>
               </div>
            )}
         </>
      );
   }
}

export default ProfileStatus;
