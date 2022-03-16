class Node{
    constructor(element){
        this.element = element;
        this.next = null;
    }
}
class LinkedList{
    constructor(){
        this.head = undefined;
        this.count = 0;
        this.equelFn = function(ele1, ele2){
            return ele1 === ele2;
        }
    }
    push(element){
        let node = new Node(element), lastNode = this.head;
        if(this.count === 0){
            this.head = node;
        }else{
            while(lastNode.next){
                lastNode = lastNode.next;
            }
            lastNode.next = node;
        }
        this.count++;
    }
    insert(element, index){
        if( index < 0 || index > this.count) return undefined;
        let previousNode = this.getElementAt(index - 1);
        let nextNode = this.getElementAt(index);
        let node = new Node(element);
        if(index === 0){
            this.head = node;
            node.next = nextNode;
            return;
        }
        // if(index === this.count){
        //     previousNode
        // }
        previousNode.next = node;
        node.next = nextNode;
        this.count++;
    }
    getElementAt(index){
        if( index < 0 || index >= this.count) return undefined;
        let node = this.head;
        for(let i = 1; i <= index; i++){
            node = node.next;
        }
        return node;
    }
    remove(element){
        let position = this.indexOf(element);
        return this.removeAt(position);
    }
    indexOf(element){
        let position = -1, index = -1, node = this.head;
        while(node){
            index++
            if( this.equelFn(element, node.element) ){
                position = index;
                break;
            }
            node = node.next;
        }
        return position;
    }
    removeAt(index){
        if( index < 0 || index >= this.count) return undefined;
        let previousNode = null, 
            node = null,
            nextNode = null;
        if(index === 0 ){
            node = this.head;
            this.head = node.next;
            return node;
        }
        previousNode = this.getElementAt(index -1);
        node = previousNode.next;
        nextNode = node.next;
        if(!nextNode){
            previousNode.next = undefined;
        }else{
            previousNode.next = nextNode;
        }
        this.count--;
        return node;
    }
    isEmpty(){
        return this.count === 0;
    }
    size(){
        return this.count;
    }
    toString(){
        let str = this.head.element, nextNode = this.head.next;
        while( nextNode ){
            str = `${str},${nextNode.element}`;
            nextNode = nextNode.next;
        }
        return str;
    }
}
linkedlist = new LinkedList();
linkedlist.push(1)
linkedlist.push(2)
linkedlist.push(3)
console.log(linkedlist.toString())
// console.log(linkedlist.indexOf(2))
// console.log(linkedlist.size())
console.log(linkedlist.remove(3))
console.log(linkedlist.insert(3, 0))
console.log(linkedlist.toString())