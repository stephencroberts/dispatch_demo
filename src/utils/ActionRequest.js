class ActionRequest {
  constructor(args) {
    this.actionType = args.actionType
    this.fetching = args.fetching || false
    this.success = args.success || false
    if (args.data) this.data = args.data
  }
}

export default ActionRequest