class HihesNode {
  name: string;
  arr_hihesNode_child: HihesNode[] = [];
  hihesNode_parent: HihesNode | null = null;
  static seqNumStatic: number = 0;
  seqNum = ++HihesNode.seqNumStatic;

  constructor(name: string) {
    this.name = name;
  }

  appendNode(hihesNode: HihesNode) {
    if (hihesNode.hihesNode_parent == null) {
      this.arr_hihesNode_child.push(hihesNode);
      hihesNode.hihesNode_parent = this;
    } else {
      throw new Error('Already have Parent Node');
    }
  }

         

                                     
                                                                                  
                      
  onClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {};
}

export { HihesNode };
