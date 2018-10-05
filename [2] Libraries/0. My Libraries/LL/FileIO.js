//imported Classes
LL.bindClass("java.io.File");
LL.bindClass("java.io.FileWriter");

//read file
function readFile(filePath) {
    var file = new File(filePath);
    var r = new BufferedReader(new FileReader(file));
    var s = "";
    var l;
    while ((l = r.readLine()) != null)
        s += (l + "\n");
    return s;
    //var s = read(LL.getContext().getFilesDir().getPath()+"/pages/"+c.getId()+"/conf");
}

//write file
function writeFile(filePath, text) {

    var fw = new FileWriter(new File(filePath));
    fw.write(text);
    fw.close();

}

