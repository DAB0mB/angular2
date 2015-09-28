class Compiler extends CachingCompiler {
  constructor(compilerName) {
    super({
      compilerName: compilerName,
      defaultCacheSize: 1024 * 1024 * 10
    });
  }

  getCacheKey(file) {
    return file.getSourceHash();
  }

  processFilesForTarget(files) {
    Object.keys(FileMixin).forEach((k) =>
      files.forEach((file) => file[k] = FileMixin[k])
    );

    super.processFilesForTarget(files);
  }
}

var FileMixin = {
  getPackagePrefixedPath(extension) {
    return this.getPackagePrefix(extension) + this.getPathInPackage();
  },

  getPackagePrefixedModule(extension) {
    return this.getPackagePrefix(extension) + this.getModuleName();
  },

  getPackagePrefix(extension) {
    var packageName = this.getPackageName();
    if (!packageName) return '';

    switch (extension || this.getExtension()) {
      case 'html': return packageName.replace(':', '-') + '/';
      case 'jsx': return '{' + packageName + '}/';
      case 'log': return '{' + packageName + '} ';
      default: return '';
    }
  },

  getModuleName() {
    return this.getPathInPackage().match(/^(.*?)\.[^\/]*$/)[1];
  }
};

this.Compiler = Compiler;