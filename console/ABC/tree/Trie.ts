class TrieNode {
  children: { [key: string]: TrieNode }
  isEndOfWord: boolean

  constructor() {
    this.children = {}
    this.isEndOfWord = false
  }
}

export class Trie {
  root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  insert(word: string) {
    let currentNode = this.root
    for (const char of word) {
      if (!currentNode.children[char]) {
        currentNode.children[char] = new TrieNode()
      }
      currentNode = currentNode.children[char]
    }
    currentNode.isEndOfWord = true
  }

  search(word: string) {
    let currentNode = this.root
    for (const char of word) {
      if (!currentNode.children[char]) {
        return false
      }
      currentNode = currentNode.children[char]
    }
    return currentNode.isEndOfWord
  }
}

export const testTrie = () => {
  const trie = new Trie()
  trie.insert('i18n')
  trie.insert('insert')
  trie.insert('insertion')
  console.log('insertPoint:', trie.search('insertPoint'))
  console.log('insertion:', trie.search('insertion'))
}
