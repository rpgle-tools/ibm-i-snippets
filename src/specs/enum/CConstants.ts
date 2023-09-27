export const enum CFieldNames {
  factor1 = "FACTOR1",
  opcode = "OPCODE",
  extensors = "EXTENSORS",
  factor2 = "FACTOR2",
  result = "RESULT",
}

export const C_FIELDS = [
  CFieldNames.factor1,
  CFieldNames.opcode,
  CFieldNames.extensors,
  CFieldNames.factor2,
  CFieldNames.result,
];


export enum opCode{
  acq = "acq",
  add = "add",
  adddur = "adddur",
  alloc = "alloc",
  and = "and", // contains function modifiers
  begsr = "begsr",
  bitoff = "bitoff",
  biton = "biton",
  cab = "cab", // contains function modifiers
  call = "call",
  callb = "callb",
  callp = "callp",
  cas = "cas", // contains function modifiers
  cat = "cat",
  chain = "chain",
  check ="check",
  checkr = "checkr",
  clear = "clear",
  close = "close",
  commit = "commit",
  comp = "comp",
  dealloc = "dealloc",
  define = "define",
  delete = "delete",
  div = "div",
  do = "do",
  dou = "dou", //contains function modifiers
  dow = "dow", //contains function modifiers
  dsply = "dsply",
  dump = "dump",
  else = "else",
  elseif = "elseif",
  end = "end", //contains function modifiers
  endsr = "endsr",
  eval = "eval",
  evalr = "evalr",
  except = "except",
  exfmt = "exfmt",
  exsr = "exsr",
  extrct = "extrct",
  feod = "feod",
  for = "for",
  force = "force",
  goto = "goto",
  if = "if", //contains function modifiers
  in = "in",
  iter = "iter",
  kfld = "kfld",
  klist = "klist",
  leave = "leave",
  leavesr = "leavesr",
  lookup = "lookup",
  mhhzo = "mhhzo", // contains function modifier
  mhlzo = "mhlzo", // contains function modifier
  mlhzo = "mlhzo", // contains function modifier
  mllzo = "mllzo", // contains function modifier
  move = "move",
  movea = "movea",
  movel = "movel",
  mult = "mult",
  mvr = "mvr",
  next = "next",
  occur = "occur",
  onError = "on-error",
  open = "open",
  or = "or", // contains function modifier
  other = "other",
  out = "out",
  parm = "parm",
  plist = "plist",
  post = "post",
  read = "read",
  readc = "readc",
  reade = "reade",
  readp = "readp",
  readpe = "readpe",
  realloc = "realloc",
  rel = "rel",
  reset = "reset",
  return = "return",
  rolbk = "rolbk",
  scan = "scan",
  select = "select",
  setgt = "setgt",
  setll = "setll",
  setoff = "setoff",
  seton = "seton",
  shtdn = "shtdn",
  sorta = "sorta",
  sqrt  = "sqrt",
  sub = "sub",
  subdur = "subdur",
  subst = "subst",
  tag = "tag",
  test = "test",
  testb = "testb",
  testn = "testn",
  testz = "testz",
  time = "time",
  unlock = "unlock",
  update = "update",
  when = "when", // contains function modifier
  write = "write",
  xfoot = "xfoot",
  xlate = "xlate",
  zAdd = "z-add",
  zSub = "z-sub",
}


export const configuration = [
  {
    name: opCode,

  }
];