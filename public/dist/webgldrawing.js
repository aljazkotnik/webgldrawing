(function () {
  'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;

    try {
      Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
      return true;
    } catch (e) {
      return false;
    }
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  function _createSuper(Derived) {
    var hasNativeReflectConstruct = _isNativeReflectConstruct();

    return function _createSuperInternal() {
      var Super = _getPrototypeOf(Derived),
          result;

      if (hasNativeReflectConstruct) {
        var NewTarget = _getPrototypeOf(this).constructor;

        result = Reflect.construct(Super, arguments, NewTarget);
      } else {
        result = Super.apply(this, arguments);
      }

      return _possibleConstructorReturn(this, result);
    };
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  /* @license twgl.js 4.19.2 Copyright (c) 2015, Gregg Tavares All Rights Reserved.
  Available via the MIT license.
  see: http://github.com/greggman/twgl.js for details */

  function error(...args) {
    console.error(...args);
  }

  function isShader(gl, t) {
    return typeof WebGLShader !== 'undefined' && t instanceof WebGLShader;
  }

  function isTexture(gl, t) {
    return typeof WebGLTexture !== 'undefined' && t instanceof WebGLTexture;
  }

  /*
   * Copyright 2019 Gregg Tavares
   *
   * Permission is hereby granted, free of charge, to any person obtaining a
   * copy of this software and associated documentation files (the "Software"),
   * to deal in the Software without restriction, including without limitation
   * the rights to use, copy, modify, merge, publish, distribute, sublicense,
   * and/or sell copies of the Software, and to permit persons to whom the
   * Software is furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
   * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
   * DEALINGS IN THE SOFTWARE.
   */

  /**
   * Gets the gl version as a number
   * @param {WebGLRenderingContext} gl A WebGLRenderingContext
   * @return {number} version of gl
   * @private
   */
  //function getVersionAsNumber(gl) {
  //  return parseFloat(gl.getParameter(gl.VERSION).substr(6));
  //}

  /**
   * Check if context is WebGL 2.0
   * @param {WebGLRenderingContext} gl A WebGLRenderingContext
   * @return {bool} true if it's WebGL 2.0
   * @memberOf module:twgl
   */
  function isWebGL2(gl) {
    // This is the correct check but it's slow
    //  return gl.getParameter(gl.VERSION).indexOf("WebGL 2.0") === 0;
    // This might also be the correct check but I'm assuming it's slow-ish
    // return gl instanceof WebGL2RenderingContext;
    return !!gl.texStorage2D;
  }

  /**
   * Gets a string for WebGL enum
   *
   * Note: Several enums are the same. Without more
   * context (which function) it's impossible to always
   * give the correct enum. As it is, for matching values
   * it gives all enums. Checking the WebGL2RenderingContext
   * that means
   *
   *      0     = ZERO | POINT | NONE | NO_ERROR
   *      1     = ONE | LINES | SYNC_FLUSH_COMMANDS_BIT
   *      32777 = BLEND_EQUATION_RGB | BLEND_EQUATION_RGB
   *      36662 = COPY_READ_BUFFER | COPY_READ_BUFFER_BINDING
   *      36663 = COPY_WRITE_BUFFER | COPY_WRITE_BUFFER_BINDING
   *      36006 = FRAMEBUFFER_BINDING | DRAW_FRAMEBUFFER_BINDING
   *
   * It's also not useful for bits really unless you pass in individual bits.
   * In other words
   *
   *     const bits = gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT;
   *     twgl.glEnumToString(gl, bits);  // not going to work
   *
   * Note that some enums only exist on extensions. If you
   * want them to show up you need to pass the extension at least
   * once. For example
   *
   *     const ext = gl.getExtension('WEBGL_compressed_texture_s3tc');
   *     if (ext) {
   *        twgl.glEnumToString(ext, 0);  // just prime the function
   *
   *        ..later..
   *
   *        const internalFormat = ext.COMPRESSED_RGB_S3TC_DXT1_EXT;
   *        console.log(twgl.glEnumToString(gl, internalFormat));
   *
   * Notice I didn't have to pass the extension the second time. This means
   * you can have place that generically gets an enum for texture formats for example.
   * and as long as you primed the function with the extensions
   *
   * If you're using `twgl.addExtensionsToContext` to enable your extensions
   * then twgl will automatically get the extension's enums.
   *
   * @param {WebGLRenderingContext} gl A WebGLRenderingContext or any extension object
   * @param {number} value the value of the enum you want to look up.
   * @return {string} enum string or hex value
   * @memberOf module:twgl
   * @function glEnumToString
   */
  const glEnumToString = (function() {
    const haveEnumsForType = {};
    const enums = {};

    function addEnums(gl) {
      const type = gl.constructor.name;
      if (!haveEnumsForType[type]) {
        for (const key in gl) {
          if (typeof gl[key] === 'number') {
            const existing = enums[gl[key]];
            enums[gl[key]] = existing ? `${existing} | ${key}` : key;
          }
        }
        haveEnumsForType[type] = true;
      }
    }

    return function glEnumToString(gl, value) {
      addEnums(gl);
      return enums[value] || (typeof value === 'number' ? `0x${value.toString(16)}` : value);
    };
  }());

  /*
   * Copyright 2019 Gregg Tavares
   *
   * Permission is hereby granted, free of charge, to any person obtaining a
   * copy of this software and associated documentation files (the "Software"),
   * to deal in the Software without restriction, including without limitation
   * the rights to use, copy, modify, merge, publish, distribute, sublicense,
   * and/or sell copies of the Software, and to permit persons to whom the
   * Software is furnished to do so, subject to the following conditions:
   *
   * The above copyright notice and this permission notice shall be included in
   * all copies or substantial portions of the Software.
   *
   * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
   * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
   * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.  IN NO EVENT SHALL
   * THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
   * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
   * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
   * DEALINGS IN THE SOFTWARE.
   */

  /**
   * Low level shader program related functions
   *
   * You should generally not need to use these functions. They are provided
   * for those cases where you're doing something out of the ordinary
   * and you need lower level access.
   *
   * For backward compatibility they are available at both `twgl.programs` and `twgl`
   * itself
   *
   * See {@link module:twgl} for core functions
   *
   * @module twgl/programs
   */

  const error$1 = error;
  function getElementById(id) {
    return (typeof document !== 'undefined' && document.getElementById)
        ? document.getElementById(id)
        : null;
  }

  const TEXTURE0                       = 0x84c0;

  const ARRAY_BUFFER$1                   = 0x8892;

  const COMPILE_STATUS                 = 0x8b81;
  const LINK_STATUS                    = 0x8b82;
  const FRAGMENT_SHADER                = 0x8b30;
  const VERTEX_SHADER                  = 0x8b31;
  const SEPARATE_ATTRIBS               = 0x8c8d;

  const ACTIVE_UNIFORMS                = 0x8b86;
  const ACTIVE_ATTRIBUTES              = 0x8b89;
  const TRANSFORM_FEEDBACK_VARYINGS    = 0x8c83;
  const ACTIVE_UNIFORM_BLOCKS          = 0x8a36;
  const UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER   = 0x8a44;
  const UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER = 0x8a46;
  const UNIFORM_BLOCK_DATA_SIZE                     = 0x8a40;
  const UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES        = 0x8a43;

  const FLOAT$3                         = 0x1406;
  const FLOAT_VEC2                    = 0x8B50;
  const FLOAT_VEC3                    = 0x8B51;
  const FLOAT_VEC4                    = 0x8B52;
  const INT$3                           = 0x1404;
  const INT_VEC2                      = 0x8B53;
  const INT_VEC3                      = 0x8B54;
  const INT_VEC4                      = 0x8B55;
  const BOOL                          = 0x8B56;
  const BOOL_VEC2                     = 0x8B57;
  const BOOL_VEC3                     = 0x8B58;
  const BOOL_VEC4                     = 0x8B59;
  const FLOAT_MAT2                    = 0x8B5A;
  const FLOAT_MAT3                    = 0x8B5B;
  const FLOAT_MAT4                    = 0x8B5C;
  const SAMPLER_2D                    = 0x8B5E;
  const SAMPLER_CUBE                  = 0x8B60;
  const SAMPLER_3D                    = 0x8B5F;
  const SAMPLER_2D_SHADOW             = 0x8B62;
  const FLOAT_MAT2x3                  = 0x8B65;
  const FLOAT_MAT2x4                  = 0x8B66;
  const FLOAT_MAT3x2                  = 0x8B67;
  const FLOAT_MAT3x4                  = 0x8B68;
  const FLOAT_MAT4x2                  = 0x8B69;
  const FLOAT_MAT4x3                  = 0x8B6A;
  const SAMPLER_2D_ARRAY              = 0x8DC1;
  const SAMPLER_2D_ARRAY_SHADOW       = 0x8DC4;
  const SAMPLER_CUBE_SHADOW           = 0x8DC5;
  const UNSIGNED_INT$3                  = 0x1405;
  const UNSIGNED_INT_VEC2             = 0x8DC6;
  const UNSIGNED_INT_VEC3             = 0x8DC7;
  const UNSIGNED_INT_VEC4             = 0x8DC8;
  const INT_SAMPLER_2D                = 0x8DCA;
  const INT_SAMPLER_3D                = 0x8DCB;
  const INT_SAMPLER_CUBE              = 0x8DCC;
  const INT_SAMPLER_2D_ARRAY          = 0x8DCF;
  const UNSIGNED_INT_SAMPLER_2D       = 0x8DD2;
  const UNSIGNED_INT_SAMPLER_3D       = 0x8DD3;
  const UNSIGNED_INT_SAMPLER_CUBE     = 0x8DD4;
  const UNSIGNED_INT_SAMPLER_2D_ARRAY = 0x8DD7;

  const TEXTURE_2D$1                    = 0x0DE1;
  const TEXTURE_CUBE_MAP$1              = 0x8513;
  const TEXTURE_3D$1                    = 0x806F;
  const TEXTURE_2D_ARRAY$1              = 0x8C1A;

  const typeMap = {};

  /**
   * Returns the corresponding bind point for a given sampler type
   */
  function getBindPointForSamplerType(gl, type) {
    return typeMap[type].bindPoint;
  }

  // This kind of sucks! If you could compose functions as in `var fn = gl[name];`
  // this code could be a lot smaller but that is sadly really slow (T_T)

  function floatSetter(gl, location) {
    return function(v) {
      gl.uniform1f(location, v);
    };
  }

  function floatArraySetter(gl, location) {
    return function(v) {
      gl.uniform1fv(location, v);
    };
  }

  function floatVec2Setter(gl, location) {
    return function(v) {
      gl.uniform2fv(location, v);
    };
  }

  function floatVec3Setter(gl, location) {
    return function(v) {
      gl.uniform3fv(location, v);
    };
  }

  function floatVec4Setter(gl, location) {
    return function(v) {
      gl.uniform4fv(location, v);
    };
  }

  function intSetter(gl, location) {
    return function(v) {
      gl.uniform1i(location, v);
    };
  }

  function intArraySetter(gl, location) {
    return function(v) {
      gl.uniform1iv(location, v);
    };
  }

  function intVec2Setter(gl, location) {
    return function(v) {
      gl.uniform2iv(location, v);
    };
  }

  function intVec3Setter(gl, location) {
    return function(v) {
      gl.uniform3iv(location, v);
    };
  }

  function intVec4Setter(gl, location) {
    return function(v) {
      gl.uniform4iv(location, v);
    };
  }

  function uintSetter(gl, location) {
    return function(v) {
      gl.uniform1ui(location, v);
    };
  }

  function uintArraySetter(gl, location) {
    return function(v) {
      gl.uniform1uiv(location, v);
    };
  }

  function uintVec2Setter(gl, location) {
    return function(v) {
      gl.uniform2uiv(location, v);
    };
  }

  function uintVec3Setter(gl, location) {
    return function(v) {
      gl.uniform3uiv(location, v);
    };
  }

  function uintVec4Setter(gl, location) {
    return function(v) {
      gl.uniform4uiv(location, v);
    };
  }

  function floatMat2Setter(gl, location) {
    return function(v) {
      gl.uniformMatrix2fv(location, false, v);
    };
  }

  function floatMat3Setter(gl, location) {
    return function(v) {
      gl.uniformMatrix3fv(location, false, v);
    };
  }

  function floatMat4Setter(gl, location) {
    return function(v) {
      gl.uniformMatrix4fv(location, false, v);
    };
  }

  function floatMat23Setter(gl, location) {
    return function(v) {
      gl.uniformMatrix2x3fv(location, false, v);
    };
  }

  function floatMat32Setter(gl, location) {
    return function(v) {
      gl.uniformMatrix3x2fv(location, false, v);
    };
  }

  function floatMat24Setter(gl, location) {
    return function(v) {
      gl.uniformMatrix2x4fv(location, false, v);
    };
  }

  function floatMat42Setter(gl, location) {
    return function(v) {
      gl.uniformMatrix4x2fv(location, false, v);
    };
  }

  function floatMat34Setter(gl, location) {
    return function(v) {
      gl.uniformMatrix3x4fv(location, false, v);
    };
  }

  function floatMat43Setter(gl, location) {
    return function(v) {
      gl.uniformMatrix4x3fv(location, false, v);
    };
  }

  function samplerSetter(gl, type, unit, location) {
    const bindPoint = getBindPointForSamplerType(gl, type);
    return isWebGL2(gl) ? function(textureOrPair) {
      let texture;
      let sampler;
      if (isTexture(gl, textureOrPair)) {
        texture = textureOrPair;
        sampler = null;
      } else {
        texture = textureOrPair.texture;
        sampler = textureOrPair.sampler;
      }
      gl.uniform1i(location, unit);
      gl.activeTexture(TEXTURE0 + unit);
      gl.bindTexture(bindPoint, texture);
      gl.bindSampler(unit, sampler);
    } : function(texture) {
      gl.uniform1i(location, unit);
      gl.activeTexture(TEXTURE0 + unit);
      gl.bindTexture(bindPoint, texture);
    };
  }

  function samplerArraySetter(gl, type, unit, location, size) {
    const bindPoint = getBindPointForSamplerType(gl, type);
    const units = new Int32Array(size);
    for (let ii = 0; ii < size; ++ii) {
      units[ii] = unit + ii;
    }

    return isWebGL2(gl) ? function(textures) {
      gl.uniform1iv(location, units);
      textures.forEach(function(textureOrPair, index) {
        gl.activeTexture(TEXTURE0 + units[index]);
        let texture;
        let sampler;
        if (isTexture(gl, textureOrPair)) {
          texture = textureOrPair;
          sampler = null;
        } else {
          texture = textureOrPair.texture;
          sampler = textureOrPair.sampler;
        }
        gl.bindSampler(unit, sampler);
        gl.bindTexture(bindPoint, texture);
      });
    } : function(textures) {
      gl.uniform1iv(location, units);
      textures.forEach(function(texture, index) {
        gl.activeTexture(TEXTURE0 + units[index]);
        gl.bindTexture(bindPoint, texture);
      });
    };
  }

  typeMap[FLOAT$3]                         = { Type: Float32Array, size:  4, setter: floatSetter,      arraySetter: floatArraySetter, };
  typeMap[FLOAT_VEC2]                    = { Type: Float32Array, size:  8, setter: floatVec2Setter,  };
  typeMap[FLOAT_VEC3]                    = { Type: Float32Array, size: 12, setter: floatVec3Setter,  };
  typeMap[FLOAT_VEC4]                    = { Type: Float32Array, size: 16, setter: floatVec4Setter,  };
  typeMap[INT$3]                           = { Type: Int32Array,   size:  4, setter: intSetter,        arraySetter: intArraySetter, };
  typeMap[INT_VEC2]                      = { Type: Int32Array,   size:  8, setter: intVec2Setter,    };
  typeMap[INT_VEC3]                      = { Type: Int32Array,   size: 12, setter: intVec3Setter,    };
  typeMap[INT_VEC4]                      = { Type: Int32Array,   size: 16, setter: intVec4Setter,    };
  typeMap[UNSIGNED_INT$3]                  = { Type: Uint32Array,  size:  4, setter: uintSetter,       arraySetter: uintArraySetter, };
  typeMap[UNSIGNED_INT_VEC2]             = { Type: Uint32Array,  size:  8, setter: uintVec2Setter,   };
  typeMap[UNSIGNED_INT_VEC3]             = { Type: Uint32Array,  size: 12, setter: uintVec3Setter,   };
  typeMap[UNSIGNED_INT_VEC4]             = { Type: Uint32Array,  size: 16, setter: uintVec4Setter,   };
  typeMap[BOOL]                          = { Type: Uint32Array,  size:  4, setter: intSetter,        arraySetter: intArraySetter, };
  typeMap[BOOL_VEC2]                     = { Type: Uint32Array,  size:  8, setter: intVec2Setter,    };
  typeMap[BOOL_VEC3]                     = { Type: Uint32Array,  size: 12, setter: intVec3Setter,    };
  typeMap[BOOL_VEC4]                     = { Type: Uint32Array,  size: 16, setter: intVec4Setter,    };
  typeMap[FLOAT_MAT2]                    = { Type: Float32Array, size: 16, setter: floatMat2Setter,  };
  typeMap[FLOAT_MAT3]                    = { Type: Float32Array, size: 36, setter: floatMat3Setter,  };
  typeMap[FLOAT_MAT4]                    = { Type: Float32Array, size: 64, setter: floatMat4Setter,  };
  typeMap[FLOAT_MAT2x3]                  = { Type: Float32Array, size: 24, setter: floatMat23Setter, };
  typeMap[FLOAT_MAT2x4]                  = { Type: Float32Array, size: 32, setter: floatMat24Setter, };
  typeMap[FLOAT_MAT3x2]                  = { Type: Float32Array, size: 24, setter: floatMat32Setter, };
  typeMap[FLOAT_MAT3x4]                  = { Type: Float32Array, size: 48, setter: floatMat34Setter, };
  typeMap[FLOAT_MAT4x2]                  = { Type: Float32Array, size: 32, setter: floatMat42Setter, };
  typeMap[FLOAT_MAT4x3]                  = { Type: Float32Array, size: 48, setter: floatMat43Setter, };
  typeMap[SAMPLER_2D]                    = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
  typeMap[SAMPLER_CUBE]                  = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1, };
  typeMap[SAMPLER_3D]                    = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D$1,       };
  typeMap[SAMPLER_2D_SHADOW]             = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
  typeMap[SAMPLER_2D_ARRAY]              = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1, };
  typeMap[SAMPLER_2D_ARRAY_SHADOW]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1, };
  typeMap[SAMPLER_CUBE_SHADOW]           = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1, };
  typeMap[INT_SAMPLER_2D]                = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
  typeMap[INT_SAMPLER_3D]                = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D$1,       };
  typeMap[INT_SAMPLER_CUBE]              = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1, };
  typeMap[INT_SAMPLER_2D_ARRAY]          = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1, };
  typeMap[UNSIGNED_INT_SAMPLER_2D]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D$1,       };
  typeMap[UNSIGNED_INT_SAMPLER_3D]       = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_3D$1,       };
  typeMap[UNSIGNED_INT_SAMPLER_CUBE]     = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_CUBE_MAP$1, };
  typeMap[UNSIGNED_INT_SAMPLER_2D_ARRAY] = { Type: null,         size:  0, setter: samplerSetter,    arraySetter: samplerArraySetter, bindPoint: TEXTURE_2D_ARRAY$1, };

  function floatAttribSetter(gl, index) {
    return function(b) {
      if (b.value) {
        gl.disableVertexAttribArray(index);
        switch (b.value.length) {
          case 4:
            gl.vertexAttrib4fv(index, b.value);
            break;
          case 3:
            gl.vertexAttrib3fv(index, b.value);
            break;
          case 2:
            gl.vertexAttrib2fv(index, b.value);
            break;
          case 1:
            gl.vertexAttrib1fv(index, b.value);
            break;
          default:
            throw new Error('the length of a float constant value must be between 1 and 4!');
        }
      } else {
        gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
        gl.enableVertexAttribArray(index);
        gl.vertexAttribPointer(
            index, b.numComponents || b.size, b.type || FLOAT$3, b.normalize || false, b.stride || 0, b.offset || 0);
        if (b.divisor !== undefined) {
          gl.vertexAttribDivisor(index, b.divisor);
        }
      }
    };
  }

  function intAttribSetter(gl, index) {
    return function(b) {
      if (b.value) {
        gl.disableVertexAttribArray(index);
        if (b.value.length === 4) {
          gl.vertexAttrib4iv(index, b.value);
        } else {
          throw new Error('The length of an integer constant value must be 4!');
        }
      } else {
        gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
        gl.enableVertexAttribArray(index);
        gl.vertexAttribIPointer(
            index, b.numComponents || b.size, b.type || INT$3, b.stride || 0, b.offset || 0);
        if (b.divisor !== undefined) {
          gl.vertexAttribDivisor(index, b.divisor);
        }
      }
    };
  }

  function uintAttribSetter(gl, index) {
    return function(b) {
      if (b.value) {
        gl.disableVertexAttribArray(index);
        if (b.value.length === 4) {
          gl.vertexAttrib4uiv(index, b.value);
        } else {
          throw new Error('The length of an unsigned integer constant value must be 4!');
        }
      } else {
        gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
        gl.enableVertexAttribArray(index);
        gl.vertexAttribIPointer(
            index, b.numComponents || b.size, b.type || UNSIGNED_INT$3, b.stride || 0, b.offset || 0);
        if (b.divisor !== undefined) {
          gl.vertexAttribDivisor(index, b.divisor);
        }
      }
    };
  }

  function matAttribSetter(gl, index, typeInfo) {
    const defaultSize = typeInfo.size;
    const count = typeInfo.count;

    return function(b) {
      gl.bindBuffer(ARRAY_BUFFER$1, b.buffer);
      const numComponents = b.size || b.numComponents || defaultSize;
      const size = numComponents / count;
      const type = b.type || FLOAT$3;
      const typeInfo = typeMap[type];
      const stride = typeInfo.size * numComponents;
      const normalize = b.normalize || false;
      const offset = b.offset || 0;
      const rowOffset = stride / count;
      for (let i = 0; i < count; ++i) {
        gl.enableVertexAttribArray(index + i);
        gl.vertexAttribPointer(
            index + i, size, type, normalize, stride, offset + rowOffset * i);
        if (b.divisor !== undefined) {
          gl.vertexAttribDivisor(index + i, b.divisor);
        }
      }
    };
  }



  const attrTypeMap = {};
  attrTypeMap[FLOAT$3]             = { size:  4, setter: floatAttribSetter, };
  attrTypeMap[FLOAT_VEC2]        = { size:  8, setter: floatAttribSetter, };
  attrTypeMap[FLOAT_VEC3]        = { size: 12, setter: floatAttribSetter, };
  attrTypeMap[FLOAT_VEC4]        = { size: 16, setter: floatAttribSetter, };
  attrTypeMap[INT$3]               = { size:  4, setter: intAttribSetter,   };
  attrTypeMap[INT_VEC2]          = { size:  8, setter: intAttribSetter,   };
  attrTypeMap[INT_VEC3]          = { size: 12, setter: intAttribSetter,   };
  attrTypeMap[INT_VEC4]          = { size: 16, setter: intAttribSetter,   };
  attrTypeMap[UNSIGNED_INT$3]      = { size:  4, setter: uintAttribSetter,  };
  attrTypeMap[UNSIGNED_INT_VEC2] = { size:  8, setter: uintAttribSetter,  };
  attrTypeMap[UNSIGNED_INT_VEC3] = { size: 12, setter: uintAttribSetter,  };
  attrTypeMap[UNSIGNED_INT_VEC4] = { size: 16, setter: uintAttribSetter,  };
  attrTypeMap[BOOL]              = { size:  4, setter: intAttribSetter,   };
  attrTypeMap[BOOL_VEC2]         = { size:  8, setter: intAttribSetter,   };
  attrTypeMap[BOOL_VEC3]         = { size: 12, setter: intAttribSetter,   };
  attrTypeMap[BOOL_VEC4]         = { size: 16, setter: intAttribSetter,   };
  attrTypeMap[FLOAT_MAT2]        = { size:  4, setter: matAttribSetter,   count: 2, };
  attrTypeMap[FLOAT_MAT3]        = { size:  9, setter: matAttribSetter,   count: 3, };
  attrTypeMap[FLOAT_MAT4]        = { size: 16, setter: matAttribSetter,   count: 4, };

  const errorRE = /ERROR:\s*\d+:(\d+)/gi;
  function addLineNumbersWithError(src, log = '', lineOffset = 0) {
    // Note: Error message formats are not defined by any spec so this may or may not work.
    const matches = [...log.matchAll(errorRE)];
    const lineNoToErrorMap = new Map(matches.map((m, ndx) => {
      const lineNo = parseInt(m[1]);
      const next = matches[ndx + 1];
      const end = next ? next.index : log.length;
      const msg = log.substring(m.index, end);
      return [lineNo - 1, msg];
    }));
    return src.split('\n').map((line, lineNo) => {
      const err = lineNoToErrorMap.get(lineNo);
      return `${lineNo + 1 + lineOffset}: ${line}${err ? `\n\n^^^ ${err}` : ''}`;
    }).join('\n');
  }

  /**
   * Error Callback
   * @callback ErrorCallback
   * @param {string} msg error message.
   * @param {number} [lineOffset] amount to add to line number
   * @memberOf module:twgl
   */

  const spaceRE = /^[ \t]*\n/;

  /**
   * Loads a shader.
   * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
   * @param {string} shaderSource The shader source.
   * @param {number} shaderType The type of shader.
   * @param {module:twgl.ErrorCallback} opt_errorCallback callback for errors.
   * @return {WebGLShader} The created shader.
   * @private
   */
  function loadShader(gl, shaderSource, shaderType, opt_errorCallback) {
    const errFn = opt_errorCallback || error$1;
    // Create the shader object
    const shader = gl.createShader(shaderType);

    // Remove the first end of line because WebGL 2.0 requires
    // #version 300 es
    // as the first line. No whitespace allowed before that line
    // so
    //
    // <script>
    // #version 300 es
    // </script>
    //
    // Has one line before it which is invalid according to GLSL ES 3.00
    //
    let lineOffset = 0;
    if (spaceRE.test(shaderSource)) {
      lineOffset = 1;
      shaderSource = shaderSource.replace(spaceRE, '');
    }

    // Load the shader source
    gl.shaderSource(shader, shaderSource);

    // Compile the shader
    gl.compileShader(shader);

    // Check the compile status
    const compiled = gl.getShaderParameter(shader, COMPILE_STATUS);
    if (!compiled) {
      // Something went wrong during compilation; get the error
      const lastError = gl.getShaderInfoLog(shader);
      errFn(`${addLineNumbersWithError(shaderSource, lastError, lineOffset)}\nError compiling ${glEnumToString(gl, shaderType)}: ${lastError}`);
      gl.deleteShader(shader);
      return null;
    }

    return shader;
  }

  /**
   * @typedef {Object} ProgramOptions
   * @property {function(string)} [errorCallback] callback for errors
   * @property {Object.<string,number>} [attribLocations] a attribute name to location map
   * @property {(module:twgl.BufferInfo|Object.<string,module:twgl.AttribInfo>|string[])} [transformFeedbackVaryings] If passed
   *   a BufferInfo will use the attribs names inside. If passed an object of AttribInfos will use the names from that object. Otherwise
   *   you can pass an array of names.
   * @property {number} [transformFeedbackMode] the mode to pass `gl.transformFeedbackVaryings`. Defaults to `SEPARATE_ATTRIBS`.
   * @memberOf module:twgl
   */

  /**
   * Gets the program options based on all these optional arguments
   * @param {module:twgl.ProgramOptions|string[]} [opt_attribs] Options for the program or an array of attribs names. Locations will be assigned by index if not passed in
   * @param {number[]} [opt_locations] The locations for the. A parallel array to opt_attribs letting you assign locations.
   * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
   *        on error. If you want something else pass an callback. It's passed an error message.
   * @return {module:twgl.ProgramOptions} an instance of ProgramOptions based on the arguments passed in
   * @private
   */
  function getProgramOptions(opt_attribs, opt_locations, opt_errorCallback) {
    let transformFeedbackVaryings;
    let transformFeedbackMode;
    if (typeof opt_locations === 'function') {
      opt_errorCallback = opt_locations;
      opt_locations = undefined;
    }
    if (typeof opt_attribs === 'function') {
      opt_errorCallback = opt_attribs;
      opt_attribs = undefined;
    } else if (opt_attribs && !Array.isArray(opt_attribs)) {
      // If we have an errorCallback we can just return this object
      // Otherwise we need to construct one with default errorCallback
      if (opt_attribs.errorCallback) {
        return opt_attribs;
      }
      const opt = opt_attribs;
      opt_errorCallback = opt.errorCallback;
      opt_attribs = opt.attribLocations;
      transformFeedbackVaryings = opt.transformFeedbackVaryings;
      transformFeedbackMode = opt.transformFeedbackMode;
    }

    const options = {
      errorCallback: opt_errorCallback || error$1,
      transformFeedbackVaryings: transformFeedbackVaryings,
      transformFeedbackMode: transformFeedbackMode,
    };

    if (opt_attribs) {
      let attribLocations = {};
      if (Array.isArray(opt_attribs)) {
        opt_attribs.forEach(function(attrib,  ndx) {
          attribLocations[attrib] = opt_locations ? opt_locations[ndx] : ndx;
        });
      } else {
        attribLocations = opt_attribs;
      }
      options.attribLocations = attribLocations;
    }

    return options;
  }

  const defaultShaderType = [
    "VERTEX_SHADER",
    "FRAGMENT_SHADER",
  ];

  function getShaderTypeFromScriptType(gl, scriptType) {
    if (scriptType.indexOf("frag") >= 0) {
      return FRAGMENT_SHADER;
    } else if (scriptType.indexOf("vert") >= 0) {
      return VERTEX_SHADER;
    }
    return undefined;
  }

  function deleteShaders(gl, shaders) {
    shaders.forEach(function(shader) {
      gl.deleteShader(shader);
    });
  }

  /**
   * Creates a program, attaches (and/or compiles) shaders, binds attrib locations, links the
   * program and calls useProgram.
   *
   * NOTE: There are 4 signatures for this function
   *
   *     twgl.createProgram(gl, [vs, fs], options);
   *     twgl.createProgram(gl, [vs, fs], opt_errFunc);
   *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_errFunc);
   *     twgl.createProgram(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
   *
   * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
   * @param {WebGLShader[]|string[]} shaders The shaders to attach, or element ids for their source, or strings that contain their source
   * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
   * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
   * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
   *        on error. If you want something else pass an callback. It's passed an error message.
   * @return {WebGLProgram?} the created program or null if error.
   * @memberOf module:twgl/programs
   */
  function createProgram(
      gl, shaders, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const realShaders = [];
    const newShaders = [];
    for (let ndx = 0; ndx < shaders.length; ++ndx) {
      let shader = shaders[ndx];
      if (typeof (shader) === 'string') {
        const elem = getElementById(shader);
        const src = elem ? elem.text : shader;
        let type = gl[defaultShaderType[ndx]];
        if (elem && elem.type) {
          type = getShaderTypeFromScriptType(gl, elem.type) || type;
        }
        shader = loadShader(gl, src, type, progOptions.errorCallback);
        newShaders.push(shader);
      }
      if (isShader(gl, shader)) {
        realShaders.push(shader);
      }
    }

    if (realShaders.length !== shaders.length) {
      progOptions.errorCallback("not enough shaders for program");
      deleteShaders(gl, newShaders);
      return null;
    }

    const program = gl.createProgram();
    realShaders.forEach(function(shader) {
      gl.attachShader(program, shader);
    });
    if (progOptions.attribLocations) {
      Object.keys(progOptions.attribLocations).forEach(function(attrib) {
        gl.bindAttribLocation(program, progOptions.attribLocations[attrib], attrib);
      });
    }
    let varyings = progOptions.transformFeedbackVaryings;
    if (varyings) {
      if (varyings.attribs) {
        varyings = varyings.attribs;
      }
      if (!Array.isArray(varyings)) {
        varyings = Object.keys(varyings);
      }
      gl.transformFeedbackVaryings(program, varyings, progOptions.transformFeedbackMode || SEPARATE_ATTRIBS);
    }
    gl.linkProgram(program);

    // Check the link status
    const linked = gl.getProgramParameter(program, LINK_STATUS);
    if (!linked) {
      // something went wrong with the link
      const lastError = gl.getProgramInfoLog(program);
      progOptions.errorCallback(`${
      realShaders.map(shader => {
        const src = addLineNumbersWithError(gl.getShaderSource(shader), '', 0);
        const type = gl.getShaderParameter(shader, gl.SHADER_TYPE);
        return `${glEnumToString(gl, type)}\n${src}}`;
      }).join('\n')
    }\nError in program linking: ${lastError}`);

      gl.deleteProgram(program);
      deleteShaders(gl, newShaders);
      return null;
    }
    return program;
  }

  /**
   * Creates a program from 2 sources.
   *
   * NOTE: There are 4 signatures for this function
   *
   *     twgl.createProgramFromSource(gl, [vs, fs], opt_options);
   *     twgl.createProgramFromSource(gl, [vs, fs], opt_errFunc);
   *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_errFunc);
   *     twgl.createProgramFromSource(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
   *
   * @param {WebGLRenderingContext} gl The WebGLRenderingContext
   *        to use.
   * @param {string[]} shaderSources Array of sources for the
   *        shaders. The first is assumed to be the vertex shader,
   *        the second the fragment shader.
   * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
   * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
   * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
   *        on error. If you want something else pass an callback. It's passed an error message.
   * @return {WebGLProgram?} the created program or null if error.
   * @memberOf module:twgl/programs
   */
  function createProgramFromSources(
      gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    const shaders = [];
    for (let ii = 0; ii < shaderSources.length; ++ii) {
      const shader = loadShader(
          gl, shaderSources[ii], gl[defaultShaderType[ii]], progOptions.errorCallback);
      if (!shader) {
        return null;
      }
      shaders.push(shader);
    }
    return createProgram(gl, shaders, progOptions);
  }

  /**
   * Returns true if attribute/uniform is a reserved/built in
   *
   * It makes no sense to me why GL returns these because it's
   * illegal to call `gl.getUniformLocation` and `gl.getAttribLocation`
   * with names that start with `gl_` (and `webgl_` in WebGL)
   *
   * I can only assume they are there because they might count
   * when computing the number of uniforms/attributes used when you want to
   * know if you are near the limit. That doesn't really make sense
   * to me but the fact that these get returned are in the spec.
   *
   * @param {WebGLActiveInfo} info As returned from `gl.getActiveUniform` or
   *    `gl.getActiveAttrib`.
   * @return {bool} true if it's reserved
   * @private
   */
  function isBuiltIn(info) {
    const name = info.name;
    return name.startsWith("gl_") || name.startsWith("webgl_");
  }

  /**
   * Creates setter functions for all uniforms of a shader
   * program.
   *
   * @see {@link module:twgl.setUniforms}
   *
   * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
   * @param {WebGLProgram} program the program to create setters for.
   * @returns {Object.<string, function>} an object with a setter by name for each uniform
   * @memberOf module:twgl/programs
   */
  function createUniformSetters(gl, program) {
    let textureUnit = 0;

    /**
     * Creates a setter for a uniform of the given program with it's
     * location embedded in the setter.
     * @param {WebGLProgram} program
     * @param {WebGLUniformInfo} uniformInfo
     * @returns {function} the created setter.
     */
    function createUniformSetter(program, uniformInfo, location) {
      const isArray = uniformInfo.name.endsWith("[0]");
      const type = uniformInfo.type;
      const typeInfo = typeMap[type];
      if (!typeInfo) {
        throw new Error(`unknown type: 0x${type.toString(16)}`); // we should never get here.
      }
      let setter;
      if (typeInfo.bindPoint) {
        // it's a sampler
        const unit = textureUnit;
        textureUnit += uniformInfo.size;
        if (isArray) {
          setter = typeInfo.arraySetter(gl, type, unit, location, uniformInfo.size);
        } else {
          setter = typeInfo.setter(gl, type, unit, location, uniformInfo.size);
        }
      } else {
        if (typeInfo.arraySetter && isArray) {
          setter = typeInfo.arraySetter(gl, location);
        } else {
          setter = typeInfo.setter(gl, location);
        }
      }
      setter.location = location;
      return setter;
    }

    const uniformSetters = { };
    const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);

    for (let ii = 0; ii < numUniforms; ++ii) {
      const uniformInfo = gl.getActiveUniform(program, ii);
      if (isBuiltIn(uniformInfo)) {
          continue;
      }
      let name = uniformInfo.name;
      // remove the array suffix.
      if (name.endsWith("[0]")) {
        name = name.substr(0, name.length - 3);
      }
      const location = gl.getUniformLocation(program, uniformInfo.name);
      // the uniform will have no location if it's in a uniform block
      if (location) {
        uniformSetters[name] = createUniformSetter(program, uniformInfo, location);
      }
    }
    return uniformSetters;
  }

  /**
   * @typedef {Object} TransformFeedbackInfo
   * @property {number} index index of transform feedback
   * @property {number} type GL type
   * @property {number} size 1 - 4
   * @memberOf module:twgl
   */

  /**
   * Create TransformFeedbackInfo for passing to bindTransformFeedbackInfo.
   * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
   * @param {WebGLProgram} program an existing WebGLProgram.
   * @return {Object<string, module:twgl.TransformFeedbackInfo>}
   * @memberOf module:twgl
   */
  function createTransformFeedbackInfo(gl, program) {
    const info = {};
    const numVaryings = gl.getProgramParameter(program, TRANSFORM_FEEDBACK_VARYINGS);
    for (let ii = 0; ii < numVaryings; ++ii) {
      const varying = gl.getTransformFeedbackVarying(program, ii);
      info[varying.name] = {
        index: ii,
        type: varying.type,
        size: varying.size,
      };
    }
    return info;
  }

  /**
   * @typedef {Object} UniformData
   * @property {number} type The WebGL type enum for this uniform
   * @property {number} size The number of elements for this uniform
   * @property {number} blockNdx The block index this uniform appears in
   * @property {number} offset The byte offset in the block for this uniform's value
   * @memberOf module:twgl
   */

  /**
   * The specification for one UniformBlockObject
   *
   * @typedef {Object} BlockSpec
   * @property {number} index The index of the block.
   * @property {number} size The size in bytes needed for the block
   * @property {number[]} uniformIndices The indices of the uniforms used by the block. These indices
   *    correspond to entries in a UniformData array in the {@link module:twgl.UniformBlockSpec}.
   * @property {bool} usedByVertexShader Self explanatory
   * @property {bool} usedByFragmentShader Self explanatory
   * @property {bool} used Self explanatory
   * @memberOf module:twgl
   */

  /**
   * A `UniformBlockSpec` represents the data needed to create and bind
   * UniformBlockObjects for a given program
   *
   * @typedef {Object} UniformBlockSpec
   * @property {Object.<string, module:twgl.BlockSpec> blockSpecs The BlockSpec for each block by block name
   * @property {UniformData[]} uniformData An array of data for each uniform by uniform index.
   * @memberOf module:twgl
   */

  /**
   * Creates a UniformBlockSpec for the given program.
   *
   * A UniformBlockSpec represents the data needed to create and bind
   * UniformBlockObjects
   *
   * @param {WebGL2RenderingContext} gl A WebGL2 Rendering Context
   * @param {WebGLProgram} program A WebGLProgram for a successfully linked program
   * @return {module:twgl.UniformBlockSpec} The created UniformBlockSpec
   * @memberOf module:twgl/programs
   */
  function createUniformBlockSpecFromProgram(gl, program) {
    const numUniforms = gl.getProgramParameter(program, ACTIVE_UNIFORMS);
    const uniformData = [];
    const uniformIndices = [];

    for (let ii = 0; ii < numUniforms; ++ii) {
      uniformIndices.push(ii);
      uniformData.push({});
      const uniformInfo = gl.getActiveUniform(program, ii);
      if (isBuiltIn(uniformInfo)) {
        break;
      }
      uniformData[ii].name = uniformInfo.name;
    }

    [
      [ "UNIFORM_TYPE", "type" ],
      [ "UNIFORM_SIZE", "size" ],  // num elements
      [ "UNIFORM_BLOCK_INDEX", "blockNdx" ],
      [ "UNIFORM_OFFSET", "offset", ],
    ].forEach(function(pair) {
      const pname = pair[0];
      const key = pair[1];
      gl.getActiveUniforms(program, uniformIndices, gl[pname]).forEach(function(value, ndx) {
        uniformData[ndx][key] = value;
      });
    });

    const blockSpecs = {};

    const numUniformBlocks = gl.getProgramParameter(program, ACTIVE_UNIFORM_BLOCKS);
    for (let ii = 0; ii < numUniformBlocks; ++ii) {
      const name = gl.getActiveUniformBlockName(program, ii);
      const blockSpec = {
        index: gl.getUniformBlockIndex(program, name),
        usedByVertexShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_VERTEX_SHADER),
        usedByFragmentShader: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_REFERENCED_BY_FRAGMENT_SHADER),
        size: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_DATA_SIZE),
        uniformIndices: gl.getActiveUniformBlockParameter(program, ii, UNIFORM_BLOCK_ACTIVE_UNIFORM_INDICES),
      };
      blockSpec.used = blockSpec.usedByVertexShader || blockSpec.usedByFragmentShader;
      blockSpecs[name] = blockSpec;
    }

    return {
      blockSpecs: blockSpecs,
      uniformData: uniformData,
    };
  }

  /**
   * Creates setter functions for all attributes of a shader
   * program. You can pass this to {@link module:twgl.setBuffersAndAttributes} to set all your buffers and attributes.
   *
   * @see {@link module:twgl.setAttributes} for example
   * @param {WebGLRenderingContext} gl The WebGLRenderingContext to use.
   * @param {WebGLProgram} program the program to create setters for.
   * @return {Object.<string, function>} an object with a setter for each attribute by name.
   * @memberOf module:twgl/programs
   */
  function createAttributeSetters(gl, program) {
    const attribSetters = {
    };

    const numAttribs = gl.getProgramParameter(program, ACTIVE_ATTRIBUTES);
    for (let ii = 0; ii < numAttribs; ++ii) {
      const attribInfo = gl.getActiveAttrib(program, ii);
      if (isBuiltIn(attribInfo)) {
          continue;
      }
      const index = gl.getAttribLocation(program, attribInfo.name);
      const typeInfo = attrTypeMap[attribInfo.type];
      const setter = typeInfo.setter(gl, index, typeInfo);
      setter.location = index;
      attribSetters[attribInfo.name] = setter;
    }

    return attribSetters;
  }

  /**
   * @typedef {Object} ProgramInfo
   * @property {WebGLProgram} program A shader program
   * @property {Object<string, function>} uniformSetters object of setters as returned from createUniformSetters,
   * @property {Object<string, function>} attribSetters object of setters as returned from createAttribSetters,
   * @property {module:twgl.UniformBlockSpec} [uniformBlockSpace] a uniform block spec for making UniformBlockInfos with createUniformBlockInfo etc..
   * @property {Object<string, module:twgl.TransformFeedbackInfo>} [transformFeedbackInfo] info for transform feedbacks
   * @memberOf module:twgl
   */

  /**
   * Creates a ProgramInfo from an existing program.
   *
   * A ProgramInfo contains
   *
   *     programInfo = {
   *        program: WebGLProgram,
   *        uniformSetters: object of setters as returned from createUniformSetters,
   *        attribSetters: object of setters as returned from createAttribSetters,
   *     }
   *
   * @param {WebGLRenderingContext} gl The WebGLRenderingContext
   *        to use.
   * @param {WebGLProgram} program an existing WebGLProgram.
   * @return {module:twgl.ProgramInfo} The created ProgramInfo.
   * @memberOf module:twgl/programs
   */
  function createProgramInfoFromProgram(gl, program) {
    const uniformSetters = createUniformSetters(gl, program);
    const attribSetters = createAttributeSetters(gl, program);
    const programInfo = {
      program: program,
      uniformSetters: uniformSetters,
      attribSetters: attribSetters,
    };

    if (isWebGL2(gl)) {
      programInfo.uniformBlockSpec = createUniformBlockSpecFromProgram(gl, program);
      programInfo.transformFeedbackInfo = createTransformFeedbackInfo(gl, program);
    }

    return programInfo;
  }

  /**
   * Creates a ProgramInfo from 2 sources.
   *
   * A ProgramInfo contains
   *
   *     programInfo = {
   *        program: WebGLProgram,
   *        uniformSetters: object of setters as returned from createUniformSetters,
   *        attribSetters: object of setters as returned from createAttribSetters,
   *     }
   *
   * NOTE: There are 4 signatures for this function
   *
   *     twgl.createProgramInfo(gl, [vs, fs], options);
   *     twgl.createProgramInfo(gl, [vs, fs], opt_errFunc);
   *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_errFunc);
   *     twgl.createProgramInfo(gl, [vs, fs], opt_attribs, opt_locations, opt_errFunc);
   *
   * @param {WebGLRenderingContext} gl The WebGLRenderingContext
   *        to use.
   * @param {string[]} shaderSources Array of sources for the
   *        shaders or ids. The first is assumed to be the vertex shader,
   *        the second the fragment shader.
   * @param {module:twgl.ProgramOptions|string[]|module:twgl.ErrorCallback} [opt_attribs] Options for the program or an array of attribs names or an error callback. Locations will be assigned by index if not passed in
   * @param {number[]} [opt_locations|module:twgl.ErrorCallback] The locations for the. A parallel array to opt_attribs letting you assign locations or an error callback.
   * @param {module:twgl.ErrorCallback} [opt_errorCallback] callback for errors. By default it just prints an error to the console
   *        on error. If you want something else pass an callback. It's passed an error message.
   * @return {module:twgl.ProgramInfo?} The created ProgramInfo or null if it failed to link or compile
   * @memberOf module:twgl/programs
   */
  function createProgramInfo(
      gl, shaderSources, opt_attribs, opt_locations, opt_errorCallback) {
    const progOptions = getProgramOptions(opt_attribs, opt_locations, opt_errorCallback);
    let good = true;
    shaderSources = shaderSources.map(function(source) {
      // Lets assume if there is no \n it's an id
      if (source.indexOf("\n") < 0) {
        const script = getElementById(source);
        if (!script) {
          progOptions.errorCallback("no element with id: " + source);
          good = false;
        } else {
          source = script.text;
        }
      }
      return source;
    });
    if (!good) {
      return null;
    }
    const program = createProgramFromSources(gl, shaderSources, progOptions);
    if (!program) {
      return null;
    }
    return createProgramInfoFromProgram(gl, program);
  }

  function html2element$3(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim(); // Never return a text node of whitespace as the result

    return template.content.firstChild;
  } // html2element
   // joinDataToElements

  function multiplyMatrices(a, b) {
    // TODO - Simplify for explanation
    // currently taken from https://github.com/toji/gl-matrix/blob/master/src/gl-matrix/mat4.js#L306-L337
    var result = [];
    var a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11],
        a30 = a[12],
        a31 = a[13],
        a32 = a[14],
        a33 = a[15]; // Cache only the current line of the second matrix

    var b0 = b[0],
        b1 = b[1],
        b2 = b[2],
        b3 = b[3];
    result[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[4];
    b1 = b[5];
    b2 = b[6];
    b3 = b[7];
    result[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[8];
    b1 = b[9];
    b2 = b[10];
    b3 = b[11];
    result[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    b0 = b[12];
    b1 = b[13];
    b2 = b[14];
    b3 = b[15];
    result[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
    result[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
    result[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
    result[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
    return result;
  }
  function multiplyArrayOfMatrices(matrices) {
    var inputMatrix = matrices[0];

    for (var i = 1; i < matrices.length; i++) {
      inputMatrix = multiplyMatrices(inputMatrix, matrices[i]);
    }

    return inputMatrix;
  }
  function scaleMatrix(w, h, d) {
    return [w, 0, 0, 0, 0, h, 0, 0, 0, 0, d, 0, 0, 0, 0, 1];
  }
  function translateMatrix(x, y, z) {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
  }
  function invertMatrix(matrix) {
    // Adapted from: https://github.com/mrdoob/three.js/blob/master/src/math/Matrix4.js
    // Performance note: Try not to allocate memory during a loop. This is done here
    // for the ease of understanding the code samples.
    var result = [];
    var n11 = matrix[0],
        n12 = matrix[4],
        n13 = matrix[8],
        n14 = matrix[12];
    var n21 = matrix[1],
        n22 = matrix[5],
        n23 = matrix[9],
        n24 = matrix[13];
    var n31 = matrix[2],
        n32 = matrix[6],
        n33 = matrix[10],
        n34 = matrix[14];
    var n41 = matrix[3],
        n42 = matrix[7],
        n43 = matrix[11],
        n44 = matrix[15];
    result[0] = n23 * n34 * n42 - n24 * n33 * n42 + n24 * n32 * n43 - n22 * n34 * n43 - n23 * n32 * n44 + n22 * n33 * n44;
    result[4] = n14 * n33 * n42 - n13 * n34 * n42 - n14 * n32 * n43 + n12 * n34 * n43 + n13 * n32 * n44 - n12 * n33 * n44;
    result[8] = n13 * n24 * n42 - n14 * n23 * n42 + n14 * n22 * n43 - n12 * n24 * n43 - n13 * n22 * n44 + n12 * n23 * n44;
    result[12] = n14 * n23 * n32 - n13 * n24 * n32 - n14 * n22 * n33 + n12 * n24 * n33 + n13 * n22 * n34 - n12 * n23 * n34;
    result[1] = n24 * n33 * n41 - n23 * n34 * n41 - n24 * n31 * n43 + n21 * n34 * n43 + n23 * n31 * n44 - n21 * n33 * n44;
    result[5] = n13 * n34 * n41 - n14 * n33 * n41 + n14 * n31 * n43 - n11 * n34 * n43 - n13 * n31 * n44 + n11 * n33 * n44;
    result[9] = n14 * n23 * n41 - n13 * n24 * n41 - n14 * n21 * n43 + n11 * n24 * n43 + n13 * n21 * n44 - n11 * n23 * n44;
    result[13] = n13 * n24 * n31 - n14 * n23 * n31 + n14 * n21 * n33 - n11 * n24 * n33 - n13 * n21 * n34 + n11 * n23 * n34;
    result[2] = n22 * n34 * n41 - n24 * n32 * n41 + n24 * n31 * n42 - n21 * n34 * n42 - n22 * n31 * n44 + n21 * n32 * n44;
    result[6] = n14 * n32 * n41 - n12 * n34 * n41 - n14 * n31 * n42 + n11 * n34 * n42 + n12 * n31 * n44 - n11 * n32 * n44;
    result[10] = n12 * n24 * n41 - n14 * n22 * n41 + n14 * n21 * n42 - n11 * n24 * n42 - n12 * n21 * n44 + n11 * n22 * n44;
    result[14] = n14 * n22 * n31 - n12 * n24 * n31 - n14 * n21 * n32 + n11 * n24 * n32 + n12 * n21 * n34 - n11 * n22 * n34;
    result[3] = n23 * n32 * n41 - n22 * n33 * n41 - n23 * n31 * n42 + n21 * n33 * n42 + n22 * n31 * n43 - n21 * n32 * n43;
    result[7] = n12 * n33 * n41 - n13 * n32 * n41 + n13 * n31 * n42 - n11 * n33 * n42 - n12 * n31 * n43 + n11 * n32 * n43;
    result[11] = n13 * n22 * n41 - n12 * n23 * n41 - n13 * n21 * n42 + n11 * n23 * n42 + n12 * n21 * n43 - n11 * n22 * n43;
    result[15] = n12 * n23 * n31 - n13 * n22 * n31 + n13 * n21 * n32 - n11 * n23 * n32 - n12 * n21 * n33 + n11 * n22 * n33;
    var determinant = n11 * result[0] + n21 * result[4] + n31 * result[8] + n41 * result[12];

    if (determinant === 0) {
      throw new Error("Can't invert matrix, determinant is 0");
    }

    for (var i = 0; i < result.length; i++) {
      result[i] /= determinant;
    }

    return result;
  }

  var Camera = /*#__PURE__*/function () {
    // A third angle could be used to encode the camera 'roll'. 'z' is not changed in the current apps, but it would be used if the camera had 'walking' controls, e.g. through the arrow keys.
    function Camera() {
      _classCallCheck(this, Camera);

      this.mouseDown = false;
      this.mouseStart = [0, 0];
      this.x = 0;
      this.y = 0;
      this.z = 0;
      this.theta = 0;
      this.phi = 0;
      this.xStart = 0;
      this.yStart = 0;
      this.thetaStart = 0;
      this.phiStart = 0;
      this.fieldOfViewInRadians = Math.PI * 0.2;
      this.aspectRatio = 1;
      this.nearClippingPlaneDistance = 1;
      this.farClippingPlaneDistance = 100;
    } // constructor


    _createClass(Camera, [{
      key: "moveStart",
      value: function moveStart(x, y) {
        var obj = this;
        obj.mouseStart = [x, y];
        obj.mouseDown = true;
        obj.thetaStart = obj.theta;
        obj.phiStart = obj.phi;
        obj.xStart = obj.x;
        obj.yStart = obj.y;
      } // moveStart

    }, {
      key: "move",
      value: function move(x, y) {
        var obj = this;

        if (obj.mouseDown) {
          // Angles have to be in radians!! Division by 4 is just a relaxation parameter.
          var diffX = Math.PI / 180 * (x - obj.mouseStart[0]) / 4;
          var diffY = Math.PI / 180 * (y - obj.mouseStart[1]) / 4;
          obj.theta = obj.thetaStart + diffX;
          obj.phi = constrainValue(obj.phiStart - diffY, -Math.PI / 2, Math.PI / 2);
        } // if  

      } // move

    }, {
      key: "moveEnd",
      value: function moveEnd() {
        var obj = this;
        obj.mouseDown = false;
      } // moveEnd

    }, {
      key: "incrementNearClippingPlane",
      value: function incrementNearClippingPlane(d) {
        var obj = this;
        obj.nearClippingPlaneDistance = Math.max(1, obj.nearClippingPlaneDistance + d / 10);
      } // cameraChangeDist

    }]);

    return Camera;
  }(); // Camera
  var Camera2D = /*#__PURE__*/function (_Camera) {
    _inherits(Camera2D, _Camera);

    var _super = _createSuper(Camera2D); // The 2D camera has panning instead of changing the camera angle.
    // The z coordinate is not important here because it gets defined in the shaders as 0 in any case.


    function Camera2D() {
      var _this;

      _classCallCheck(this, Camera2D);

      _this = _super.call(this);

      var obj = _assertThisInitialized(_this);

      obj.zoomPointClip = [0, 0];
      obj.k = 1;
      return _this;
    } // constructor


    _createClass(Camera2D, [{
      key: "move",
      value: function move(x, y, vpp) {
        // Instead of changing the camera pitch/yaw/roll pan the view.
        var obj = this;
        vpp = vpp == undefined ? 1 : vpp;

        if (obj.mouseDown) {
          var diffX = (x - obj.mouseStart[0]) * vpp;
          var diffY = (y - obj.mouseStart[1]) * vpp; // Limit the panning?

          obj.x = obj.xStart - diffX;
          obj.y = obj.yStart + diffY;
        } // if  

      } // move

    }, {
      key: "incrementZoomValue",
      value: function incrementZoomValue(d) {
        this.k += d;
      } // incrementZoomValue

    }]);

    return Camera2D;
  }(Camera); // Camera2D

  function constrainValue(v, a, b) {
    // Constrain value 'v' to a <= v <= b.
    return Math.max(Math.min(v, b), a);
  } // constrainValue

  // Furthermore the overall wrapper is defined here so that after the class is inherited from there is space to append other modules. The class is inherited from (as opposed to plugged in as a module)

  var template$g = "\n<div class=\"item\">\n  <div class=\"label\">Label</div>\n  <div class=\"view\" style=\"width:300px; height:200px; opacity:0.001;\">\n  </div>\n</div>\n";

  var ViewFrame2D = /*#__PURE__*/function () {
    function ViewFrame2D(gl) {
      _classCallCheck(this, ViewFrame2D);

      var obj = this;
      obj.gl = gl;
      obj.node = html2element$3(template$g); // obj.view is a convenience reference that points to the node. Transforms.view is the view transformation matrix.

      obj.view = obj.node.querySelector("div.view"); // Some initial dummy geometry to allow initialisation.

      obj.geometry = {
        domain: {
          x: [0, 1],
          y: [0, 1]
        }
      }; // initial dummy values
      // Transformation matrices.

      obj.transforms = {};
      /*
      Interactivity:
      What should clicking and dragging do? Pan, or adjust camera angle? 
      
      For 2D panning is more useful.
      For 3D adjusting the camera angle is better.
      */

      obj.camera = new Camera2D(); // (e.clientX, e.clientY)

      obj.view.onmousedown = function (e) {
        obj.cameraMoveStart(e);
      };

      obj.view.onmousemove = function (e) {
        obj.cameraMove(e);
      };

      obj.view.onmouseup = function (e) {
        obj.cameraMoveEnd();
      };

      obj.view.onmouseleave = function (e) {
        obj.cameraMoveEnd();
      }; // adding a zoom directly causes the passive event warning to come up in the console, and also stops the wheel event from being properly executed.
      // If the div is empty the event does not occur!


      obj.view.addEventListener("wheel", function (e) {
        e.preventDefault();
        obj.cameraZoom(e);
      }, {
        passive: false
      });
    } // constructor

    /* The geometry moving is implemented in 'computeModelMatrix'. User interaction movement is implemented in 'computeViewMatrix'.  */


    _createClass(ViewFrame2D, [{
      key: "computeModelMatrix",
      value: function computeModelMatrix() {
        // The model matrix incorporates the initial scaling and translation to make sure the data fits in view.
        var dom = this.geometry.domain; // First translate left bottom corner to origin, scale so that top right domain corner is at 2,2, and then reposition so that domain is between -1 and 1.

        var k = 2 / Math.max(dom.x[1] - dom.x[0], dom.y[1] - dom.y[0]); // Correct for the aspect ratio of the view element. For now the y domain is rescaled because the example data featured a larger x domain, and the width was kep constant. This can be made adjustable later.

        var kar = (dom.x[1] - dom.x[0]) / (dom.y[1] - dom.y[0]);
        var translateToOrigin = translateMatrix(-dom.x[0], -dom.y[0], 0);
        var scaleToClipSpace = scaleMatrix(k, k * kar, 1);
        var translateToScaleSpace = translateMatrix(-1, -1, 0);
        this.transforms.model = multiplyArrayOfMatrices([translateToScaleSpace, scaleToClipSpace, translateToOrigin]); // model
        // Performance caveat: in real production code it's best not to create new arrays and objects in a loop. This example chooses code clarity over performance.
      } // computeModelMatrix

    }, {
      key: "computeOrthographicMatrix",
      value: function computeOrthographicMatrix() {
        // viewport: left, bottom, width, height
        this.transforms.projection = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
      } // computeOrthographicMatrix

    }, {
      key: "computeViewMatrix",
      value: function computeViewMatrix() {
        var camera = this.camera; // PANNING

        var position = translateMatrix(camera.x, camera.y, camera.z); // For zooming a scaling operation should be performed. And the zooming should be based on hte pointers position. So that point should stay in hte same position, while the rest of the view scales.
        // The values need to be in coordinate units! So the pixel location needs to be changed to value location. Mouse locations are per client window, and so must be corrected for viewport location to ensure consistent zooming behavior. Initially the zooming is not needed.
        // THE ZOOM POINT MUST BE CONVERTED TO THE CLIP SPACE FROM PIXEL COORDINATES!!! I want to translate to 0,0. That's the middle of the viewport. y has to be calculated in terms of client window.
        // For zooming I want the zoomed point to remain where it is at the moment, and everything around it should be scaled. So, for that to happen the mesh needs to be translated by the location of the point in clip coordinates, scaled, and translated back to the same coordinates in pixel values.

        var dx = camera.zoomPointClip[0];
        var dy = camera.zoomPointClip[1];
        var k = camera.k; // let x0 = camera.mouseStart[0] * this.valuePerPixel;
        // let y0 = camera.mouseStart[1] * this.valuePerPixel;
        // let k  = camera.k;

        var translateToOrigin = translateMatrix(-dx, -dy, 0);
        var scaleToZoomSpace = scaleMatrix(k, k, 1);
        var translateToZoomSpace = translateMatrix(dx, dy, 0); // Inverse the operation for camera movements, because we are actually moving the geometry in the scene, not the camera itself.
        // this.transforms.view = invertMatrix( position );

        this.transforms.view = multiplyArrayOfMatrices([invertMatrix(position), translateToZoomSpace, scaleToZoomSpace, translateToOrigin]); // model
      } // computeViewMatrix
      // On the go updates.

    }, {
      key: "update",
      value: function update() {
        var obj = this; // Compute our matrices

        obj.computeModelMatrix();
        obj.computeViewMatrix();
        obj.computeOrthographicMatrix();
      } // update

    }, {
      key: "viewport",
      get: function get() {
        var obj = this;
        var gl = obj.gl;
        var rect = obj.view.getBoundingClientRect(); // The viewport bottom is measured from the bottom of the screen.

        var width = rect.right - rect.left;
        var height = rect.bottom - rect.top;
        var left = rect.left;
        var bottom = gl.canvas.clientHeight - rect.bottom;
        return [left, bottom, width, height];
      } // get viewport

    }, {
      key: "valuePerPixel",
      get: function get() {
        // The zoom transformation will work in the clip space, which is within [-1,1]. Therefore the range is 2, and independent of hte domain of the data.
        var obj = this;
        var arx = obj.camera.k * 2 / obj.viewport[2];
        var ary = obj.camera.k * 2 / obj.viewport[3];
        return Math.max(arx, ary);
      } // get aspectRatio

    }, {
      key: "isOnScreen",
      get: function get() {
        // Check whether the viewframe is still on hte canvas screen. If it's display has been set to "none" then just return a false. "display: none" will be required when introducing the grouping interfaces.
        var obj = this;
        var isOnScreen = false;

        if (obj.node.style.display != "none") {
          var rect = obj.node.getBoundingClientRect();
          var isOffScreen = rect.bottom < 0 || rect.top > obj.gl.canvas.clientHeight || rect.right < 0 || rect.left > obj.gl.canvas.clientWidth;
          isOnScreen = !isOffScreen;
        } // if


        return isOnScreen;
      } // isOnScreen
      // Camera

    }, {
      key: "cameraMoveStart",
      value: function cameraMoveStart(e) {
        var camera = this.camera;
        camera.moveStart(e.clientX, e.clientY);
      } // startMove

    }, {
      key: "cameraMove",
      value: function cameraMove(e) {
        var camera = this.camera;
        camera.move(e.clientX, e.clientY, this.valuePerPixel);
      } // cameraMove

    }, {
      key: "cameraMoveEnd",
      value: function cameraMoveEnd() {
        var camera = this.camera;
        camera.moveEnd();
      } // cameraMoveEnd

    }, {
      key: "cameraZoom",
      value: function cameraZoom(e) {
        var obj = this; // The 2D camera works off of a zoom value, because the perspective does not change. There is no perspective transformation because the data only has x/y, and to make zoom work through perspective a third z value would have to be spliced into the ArrayBuffer data.
        // The first translate can be made using the clip coordinates. The translate back after scaling has to be done using pixels, because the point should stay at the same pixel location. Store both the clip coordinate, and the pixel coordinate.

        obj.camera.zoomPointClip = obj.pixel2clip([e.clientX, e.clientY]);
        obj.camera.incrementZoomValue(e.deltaY < 0 ? 0.1 : -0.1);
      } // cameraChangeDist

    }, {
      key: "pixel2clip",
      value: function pixel2clip(p) {
        // Pixel values can be obtained from the event. Convert the pixel value to the clip space values.
        var obj = this;
        var rect = obj.view.getBoundingClientRect(); // Clicked point within the viewport, in terms of pixels.

        var x_px = p[0] - rect.left;
        var y_px = p[1] - rect.top; // Convert to clip coordinates. Camera.x is in data coordinates.

        var x_clip = 2 * (x_px / (rect.right - rect.left)) - 1;
        var y_clip = -2 * (y_px / (rect.bottom - rect.top)) + 1;
        return [x_clip, y_clip];
      } // pixel2clip
      // When finding the return transformation I'm figuring out what the translation of the left lower corner should be to keep a particular point at the same pixel location.
      // But the model matrix converts from the data domain to hte clip domain.

    }, {
      key: "title",
      value: function title(label) {
        // Change the title of the player.
        this.node.querySelector("div.label").textContent = label;
      } // title

    }]);

    return ViewFrame2D;
  }(); // ViewFrame2D

  /*
  Should these be split up into a Mesh2D superclass and an UnsteadyMesh2D childclass?
  */
  // Some geometry to initialise the buffers.

  var vertices = [1, -0.99, 1, -1, 0.99, -1]; // vertices
  // clockwise triangles. 

  var indices = [0, 1, 2]; // indices
  // values per vertex

  var values = [0, 0, 0]; // values
  // Initial domain.

  var initdomain = {
    x: [-1, 1],
    y: [-1, 1],
    v: [0, 1],
    t: [0, 1]
  };

  var Mesh2D = /*#__PURE__*/function () {
    function Mesh2D(gl, unsteadyMetadataFilename) {
      _classCallCheck(this, Mesh2D);

      this.domain = initdomain;
      this.timesteps = [];
      var obj = this;
      obj.gl = gl; // obj.vertices = vertices;
      // obj.indices = indices;
      // obj.colors = colors;
      // "In case of glBufferData, the buffer object currently bound to target is used." (https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/glBufferData.xhtml)
      // Size of the data used by each vertex is selected in 'MeshRenderer.updateAttributesAndUniforms'. However, that should really be kept with the data specification, so that MeshRenderer doesn't need to change if the data changes. Then the MeshRenderer becomes independent of the dimension of data.

      var verticesBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
      obj.verticesBuffer = verticesBuffer;
      var valuesBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, valuesBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(values), gl.STATIC_DRAW);
      obj.valuesBuffer = valuesBuffer;
      var indicesBuffer = gl.createBuffer();
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
      gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint32Array(indices), gl.STATIC_DRAW);
      obj.indicesBuffer = indicesBuffer;
      obj.indicesLength = indices.length; // If teh index defines which frame to play next, then the timesteps need to be ordered. Maybe it's best to just enforce this by sorting the timesteps when they are loaded.

      obj._currentFrameInd = 0; // Imagine that some metadata was loaded in.
      // "./data/testmetadata.json"

      fetch(unsteadyMetadataFilename).then(function (res) {
        return res.json();
      }).then(function (content) {
        // But all three need to be available at the same time before rendering.
        var indicesPromise = loadBinData(content.indices).then(function (ab) {
          return new Uint32Array(ab);
        });
        var verticesPromise = loadBinData(content.vertices).then(function (ab) {
          return new Float32Array(ab);
        });
        /* The values should be loaded in separately from the vertices and indices.
        
        Do we just loop through some timesteps and make the promises. However, the data size restrictions should be maintained at all times! The data loading function should keep that in mind.
        */

        var valuesPromise = loadBinData(content.timesteps[obj.currentFrameInd].filename).then(function (ab) {
          return new Uint8Array(ab);
        }).then(function (ui8) {
          return Float32Array.from(ui8);
        });
        Promise.all([indicesPromise, verticesPromise, valuesPromise]).then(function (d) {
          // Domain has to be overwritten when the actual data is loaded. Afterwards, only the 'c' property should change with the timesteps. By changing the global color value ranges the colorbar can be adjusted by the user.]
          obj.domain = content.domain;
          obj.timesteps = content.timesteps;
          gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer);
          gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, d[0], gl.STATIC_DRAW);
          obj.indicesLength = d[0].length;
          gl.bindBuffer(gl.ARRAY_BUFFER, verticesBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, d[1], gl.STATIC_DRAW);
          gl.bindBuffer(gl.ARRAY_BUFFER, valuesBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, d[2], gl.STATIC_DRAW);
        }); // then
      }); // fetch
    } // constructor
    // The 'values' are stored as a 'scaled uint8 array' to save memory. The values are retransformed back into the original domain on the GPU by mapping them from [0,255] to 'currentUintRange', which is obtained from the metadata file of this unsteady simulation.
    // The MeshRenderer2D looks at the domain to determine what the full value domain of this small multiple will be. It looks at the c to determine the uint compression domain.


    _createClass(Mesh2D, [{
      key: "currentUintRange",
      get: function get() {
        // This used to be in domain under 'c', but was moved here as it will change as the frames change.
        var obj = this;
        return obj.timesteps.length > 0 ? obj.timesteps[obj.currentFrameInd].c_uint : [0, 1]; // return [871, 977]
      } // currentUintRange

    }, {
      key: "currentTime",
      get: function get() {
        // Get the time of the current frame as a fraction of the total time span available.
        var obj = this;
        return obj.timesteps[obj.currentFrameInd].t;
      } // currentTimestep

    }, {
      key: "memoryUsed",
      get: function get() {
        var obj = this;
        var memory = 0;
        obj.timesteps.forEach(function (t) {
          if (t.byteLength) {
            memory += t.byteLength;
          } // if

        });
        return memory;
      } // memoryUsed
      // There should be two separate methods to pick the current frame. One is by incrementing, and the other is by setting the appropriate time.

    }, {
      key: "incrementCurrentFrame",
      value: function incrementCurrentFrame() {
        // When incrementing past the end of the available time range we loop to the start.
        var obj = this;
        obj.currentFrameInd = (obj.currentFrameInd + 1) % obj.timesteps.length;
      } // incrementCurrentFrame

    }, {
      key: "timestepCurrentFrame",
      value: function timestepCurrentFrame(t) {
        // Different players can start at different times. However, if a dt is passed in to increment the current frame the incrementing can truncate a part of the dt, leading to different players to be at different times. Therefore the actual time is expected. If t is outside of the time range available, the min or max frame indices are returned as appropriate.
        var obj = this;
        var i = 0;
        var dist = Number.POSITIVE_INFINITY;
        obj.timesteps.forEach(function (timestep, j) {
          var d = Math.abs(timestep.t - t);

          if (d < dist) {
            dist = d;
            i = j;
          } // if

        }); // forEach

        obj.currentFrameInd = i;
      } // timestepCurrentFrame
      // This should be reworked into an outside call, because eventually it would be beneficial if the files can be loaded by a library system, and the mesh is only responsible to declare what it would like?

    }, {
      key: "currentFrameInd",
      get: // set currentFrameInd
      function get() {
        return this._currentFrameInd;
      } // get currentFrameInd
      ,
      set: function set(i) {
        // When the index is set automatically manage the data. This will allow the data to be loaded once and kept in memory.
        var obj = this;
        obj._currentFrameInd = i; // For now just load the current frame here, and save it to the timestep.

        var timestep = obj.timesteps[obj._currentFrameInd];

        if (timestep.valuesPromise == undefined) {
          timestep.valuesPromise = loadBinData(timestep.filename).then(function (ab) {
            return new Uint8Array(ab);
          });
          timestep.valuesPromise.then(function (ui8) {
            timestep.byteLength = ui8.byteLength;
          });
        } // if

      }
    }, {
      key: "updateCurrentFrameBuffer",
      value: function updateCurrentFrameBuffer() {
        // The UnsteadyPlayer will input an actual timestep, as opposed to just increment the frame. This allows simulations with different temporal resolutions to be compared directly. Comparable time frames are selected based on available data.
        // What will be passed in? Just an icrement I guess, and it's up to the user to provide time variables with the same dt and in the same domain.
        var obj = this;
        var gl = obj.gl; // The values from the files were stored as uint8, but the GPU requires them to be float32. The data is converted just before passing it to the buffer.	

        obj.timesteps[obj.currentFrameInd].valuesPromise.then(function (ui8) {
          return Float32Array.from(ui8);
        }).then(function (f32) {
          gl.bindBuffer(gl.ARRAY_BUFFER, obj.valuesBuffer);
          gl.bufferData(gl.ARRAY_BUFFER, f32, gl.STATIC_DRAW);
        });
      } // updateCurrentFrameBuffer

    }]);

    return Mesh2D;
  }(); // Mesh2D

  function loadBinData(filename) {
    return fetch(filename).then(function (res) {
      return res.arrayBuffer();
    });
  } // getBinData

  /*
  {
  	x: [-0.76, 1.01],
  	y: [-0.1, 1],
  	v: [870.4389253677576, 977.0020293037556]
  }
  */

  function html2element$2(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim(); // Never return a text node of whitespace as the result

    return template.content.firstChild;
  } // html2element

  function svg2element$2(svg) {
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.innerHTML = svg.trim();
    return g.firstChild;
  } // svg2element

  var scaleLinear$1 = /*#__PURE__*/function () {
    function scaleLinear() {
      _classCallCheck(this, scaleLinear);

      this._domain = [0, 1];
      this._range = [0, 1];
    }

    _createClass(scaleLinear, [{
      key: "domain",
      get: // domain
      function get() {
        return this._domain;
      } // domain
      ,
      set: function set(d) {
        this._domain = d;
      }
    }, {
      key: "range",
      get: // range
      function get() {
        return this._range;
      } // range
      ,
      set: function set(r) {
        this._range = r;
      }
    }, {
      key: "dom2range",
      value: function dom2range(v) {
        return mapSpaceAValueToSpaceB$1(v, this.domain, this.range);
      } // dom2range

    }, {
      key: "range2dom",
      value: function range2dom(v) {
        return mapSpaceAValueToSpaceB$1(v, this.range, this.domain);
      } // range2dom

    }]);

    return scaleLinear;
  }(); // scaleLinear

  function mapSpaceAValueToSpaceB$1(v, A, B) {
    return (v - A[0]) / (A[1] - A[0]) * (B[1] - B[0]) + B[0];
  } // mapSpaceAValueToSpaceB
   // joinDataToElements

  function play(width, y) {
    // Calculate the size of the triangle, and where the drawing should begin.
    var height = width * 2 * Math.sqrt(3) / 3;
    var r_max = height * Math.sqrt(3) / 6;
    var r = 3 > r_max ? r_max : 3;
    var dH = r * Math.sqrt(3); // Length of side cut by 1 rounding.

    var Mx = 0;
    var My = y + 5 - height / 2;
    var p0 = [Mx, My];
    var p1 = [Mx + height * Math.sqrt(3) / 2, My + height / 2];
    var p2 = [Mx, My + height];
    return "M".concat(p0[0], " ").concat(p0[1] + dH, "\n      a ").concat(r, ",").concat(r, ", 0,0,1  ").concat(r * 3 / 2, ", ").concat(-dH / 2, "\n      L ").concat(p1[0] - r * 3 / 2, " ").concat(p1[1] - dH / 2, "\n      a ").concat(r, ",").concat(r, ", 0,0,1  0, ").concat(dH, "\n      L ").concat(p2[0] + r * 3 / 2, " ").concat(p2[1] - dH / 2, "\n      a ").concat(r, ",").concat(r, ", 0,0,1  ").concat(-r * 3 / 2, ", ").concat(-dH / 2, "\n      Z\n      ");
  } // playPath


  function pause(width, y) {
    var height = width * 2 * Math.sqrt(3) / 3 - 2 * (3 * Math.sqrt(3) - 3);
    var dx = width / 5;
    var r = 3;
    var Mx = 0;
    var My = y + 5 - height / 2;
    return "\n      M ".concat(Mx + r, " ").concat(My, " \n      L ").concat(Mx + 2 * dx - r, " ").concat(My, "\n      a ").concat(r, ",").concat(r, " 0,0,1 ").concat(r, ",").concat(r, "\n      L ").concat(Mx + 2 * dx, " ").concat(My + height - r, "\n      a ").concat(r, ",").concat(r, " 0,0,1 ").concat(-r, ",").concat(r, "\n      L ").concat(Mx + r, " ").concat(My + height, "\n      a ").concat(r, ",").concat(r, " 0,0,1 ").concat(-r, ",").concat(-r, "\n      L ").concat(Mx, " ").concat(My + r, "\n      a ").concat(r, ",").concat(r, " 0,0,1 ").concat(r, ",").concat(-r, "\n\t  M ").concat(Mx + 3 * dx + r, " ").concat(My, "\n      L ").concat(Mx + 5 * dx - r, " ").concat(My, "\n      a ").concat(r, ",").concat(r, " 0,0,1 ").concat(r, ",").concat(r, "\n      L ").concat(Mx + 5 * dx, " ").concat(My + height - r, "\n      a ").concat(r, ",").concat(r, " 0,0,1 ").concat(-r, ",").concat(r, "\n      L ").concat(Mx + 3 * dx + r, " ").concat(My + height, "\n      a ").concat(r, ",").concat(r, " 0,0,1 ").concat(-r, ",").concat(-r, "\n      L ").concat(Mx + 3 * dx, " ").concat(My + r, "\n      a ").concat(r, ",").concat(r, " 0,0,1 ").concat(r, ",").concat(-r, "\n    ");
  } // pausePath


  var template$f = "\n<g style=\"cursor: pointer;\">\n  <path fill=\"tomato\" d=\"\"></path>\n</g>\n"; // Maybe the y should just be set outside? And the same for the chapter?? Maybe give it the y it should center itself about?
  // textHeight + textBottomMargin + rectHighlightHeightDelta + rectHeight/2 - H/2

  var PlayButton = /*#__PURE__*/function () {
    // The y is given as the centerline about which to position the button. Half above, and half below. The initial y is therefore half the height, and should draw the button completely on hte svg.
    function PlayButton() {
      _classCallCheck(this, PlayButton);

      this.y = 20 * 2 * Math.sqrt(3) / 3 / 2;
      this.width = 20;
      var obj = this;
      obj.node = svg2element$2(template$f);
    } // constructor


    _createClass(PlayButton, [{
      key: "update",
      value: function update(playing) {
        var obj = this;
        var d = playing ? pause(obj.width, obj.y) : play(obj.width, obj.y);
        obj.node.querySelector("path").setAttribute("d", d);
      } // update

    }]);

    return PlayButton;
  }(); // PlayButton

  var defaultRectAttributes = "stroke=\"white\" stroke-width=\"2px\"";
  var template$e = "<g class=\"chapter\">\n  <rect class=\"background\" fill=\"gainsboro\" ".concat(defaultRectAttributes, "\"></rect>\n  <rect class=\"buffering\" fill=\"gray\" ").concat(defaultRectAttributes, "\"></rect>\n  <rect class=\"foreground\" fill=\"tomato\" ").concat(defaultRectAttributes, "\"></rect>\n  <text style=\"display: none;\"></text>\n</g>");

  var PlayBarAnnotation = /*#__PURE__*/function () {
    // y = textHeight + textBottomMargin + highlightHeightDelta
    function PlayBarAnnotation(config, tscale) {
      _classCallCheck(this, PlayBarAnnotation);

      this.y = 12 + 2 + 3;
      this.height = 10;
      this.dh = 4;
      var obj = this;
      obj.node = svg2element$2(template$e);
      obj.background = obj.node.querySelector("rect.background");
      obj.buffering = obj.node.querySelector("rect.buffering");
      obj.foreground = obj.node.querySelector("rect.foreground");
      obj.label = obj.node.querySelector("text");
      obj.config = config;
      obj.tscale = tscale;
      obj.node.addEventListener("mouseenter", function () {
        obj.highlight();
      }); // addEventListener

      obj.node.addEventListener("mouseover", function () {
        obj.highlight();
      }); // addEventListener

      obj.node.addEventListener("mouseout", function () {
        obj.unhighlight();
      }); // addEventListener
    } // constructor


    _createClass(PlayBarAnnotation, [{
      key: "update",
      value: function update(t_play, t_buffer) {
        var obj = this;
        var y = obj.y;
        var x = obj.tscale.dom2range(obj.config.starttime);
        obj.background.setAttribute("y", y);
        obj.background.setAttribute("x", x);
        obj.background.setAttribute("width", obj.width);
        obj.background.setAttribute("height", obj.height);
        obj.buffering.setAttribute("y", y);
        obj.buffering.setAttribute("x", x);
        obj.buffering.setAttribute("width", obj.width * obj.timeFraction(t_buffer));
        obj.buffering.setAttribute("height", obj.height);
        obj.foreground.setAttribute("y", y);
        obj.foreground.setAttribute("x", x);
        obj.foreground.setAttribute("width", obj.width * obj.timeFraction(t_play));
        obj.foreground.setAttribute("height", obj.height);
        obj.label.setAttribute("y", 12);
        obj.label.setAttribute("x", x);
        obj.label.innerHTML = obj.config.label;
      } // update

    }, {
      key: "width",
      get: function get() {
        var obj = this;
        var x0 = obj.tscale.dom2range(obj.config.starttime);
        var x1 = obj.tscale.dom2range(obj.config.endtime); // At the beginning hte widths may be negative because the starttime of the comment exceeds the time domain of the playbar that hasn't yet been updated to the right interval. Returen 0 while this is so.

        return x1 - x0 < 0 ? 0 : x1 - x0;
      } // width

    }, {
      key: "timeFraction",
      value: function timeFraction(t) {
        var obj = this;
        var tf = (t - obj.config.starttime) / (obj.config.endtime - obj.config.starttime);
        return Math.abs(tf - 0.5) <= 0.5 ? tf : tf > 0;
      } // timeFraction

    }, {
      key: "highlight",
      value: function highlight() {
        var obj = this;
        highlightRectangle(obj.background, obj.y, obj.height, obj.dh);
        highlightRectangle(obj.buffering, obj.y, obj.height, obj.dh);
        highlightRectangle(obj.foreground, obj.y, obj.height, obj.dh);
        obj.label.style.display = "";
      } // highlight

    }, {
      key: "unhighlight",
      value: function unhighlight() {
        var obj = this;
        unhighlightRectangle(obj.background, obj.y, obj.height);
        unhighlightRectangle(obj.buffering, obj.y, obj.height);
        unhighlightRectangle(obj.foreground, obj.y, obj.height);
        obj.label.style.display = "none";
      } // highlight

    }]);

    return PlayBarAnnotation;
  }(); // PlayBarAnnotation

  function highlightRectangle(r, y, h, dh) {
    r.height.baseVal.value = h + 2 * dh;
    r.y.baseVal.value = y - dh;
  } // highlightRectangle


  function unhighlightRectangle(r, y, h) {
    r.height.baseVal.value = h;
    r.y.baseVal.value = y;
  } // unhighlightRectangle

  var template$d = "<g style=\"cursor: pointer;\"></g>"; // template

  var PlayBar = /*#__PURE__*/function () {
    // Coordinates in whole svg frame.
    function PlayBar() {
      _classCallCheck(this, PlayBar);

      this.y = 12 + 2 + 3;
      this.x0 = 20 + 6;
      this.x1 = 300;
      this.annotations = [];
      this.t_min = 0;
      this.t_max = 1;
      this.t_buffer = 0;
      this.t_play = 0;
      var obj = this;
      obj.node = svg2element$2(template$d);
      obj._tscale = new scaleLinear$1();
    } // constructor


    _createClass(PlayBar, [{
      key: "tscale",
      get: function get() {
        // The tscale is relative to the whole svg element, and takes in whole svg coordinates.
        var obj = this;
        obj._tscale.domain = [obj.t_min, obj.t_max];
        obj._tscale.range = [obj.x0, obj.x1];
        return obj._tscale;
      } // get tscale

    }, {
      key: "rebuild",
      value: function rebuild() {
        // I need to do the join, but on objects instead of elements... Or just throw them all out and create new ones? Simpler I guess
        var obj = this;
        var exiting = obj.node.querySelectorAll("g.chapter");

        for (var i = 0; i < exiting.length; i++) {
          exiting[i].remove();
        } // for
        // The creation of the chapters to show after somme annotations have been pushed still needs to be implemented.


        function makeChapterObj(label, starttime, endtime) {
          return {
            label: label,
            starttime: starttime,
            endtime: endtime == undefined ? obj.t_max : endtime
          };
        } // makeChapterObj
        // The ultimate way of doing it would be for the annotations to persist below other smaller annotations.


        var chapters = obj.annotations.reduce(function (acc, a, i) {
          var previous = acc[acc.length - 1];
          var current = makeChapterObj(a.label, a.starttime, a.endtime);

          if (previous.endtime < current.starttime) {
            // Don't curtail hte previous one but instead allow it to draw completely. This allows the chapters to be 'stacked'. Ordering them by start time ensures they all have a handle available.
            // Push in the needed padding, and then the annotation.
            acc.push(makeChapterObj("", previous.endtime, current.starttime));
          } // if


          acc.push(current);

          if (i == obj.annotations.length - 1 && current.endtime < obj.t_max) {
            acc.push(makeChapterObj("", current.endtime, obj.t_max));
          } // if


          return acc;
        }, [makeChapterObj("", obj.t_min, obj.t_max)]); // Cpters need to be sorted by starttime in order for all start points to be visible.

        obj.chapters = chapters.sort(function (a, b) {
          return a.starttime - b.starttime;
        }).map(function (c) {
          var a = new PlayBarAnnotation(c, obj.tscale);
          a.y = obj.y;
          return a;
        }); // map

        obj.chapters.forEach(function (chapter) {
          obj.node.appendChild(chapter.node);
        }); // forEach
      } // rebuild

    }, {
      key: "update",
      value: function update() {
        var obj = this;
        obj.chapters.forEach(function (chapter) {
          chapter.update(obj.t_play, obj.t_buffer);
        });
      } // update

    }, {
      key: "addchapter",
      value: function addchapter(tag) {
        // The player may need to be updated when the serverr pushes updates. Also if other users update the annotations it should appear straightaway.
        var obj = this; // tags are required to have a 'starttime'.

        if (tag.starttime) {
          var i = obj.annotations.findIndex(function (a) {
            return a.id == tag.id;
          });
          obj.annotations.splice(i > -1 ? i : 0, i > -1, tag); // Update the bar.

          obj.rebuild();
          obj.update();
        } // if

      } // addchapter

    }]);

    return PlayBar;
  }(); // PlayBar

  var template$c = "\n<div class=\"player-controls\">\n  <svg id=\"playbar\" width=\"100%\" height=\"32px\">\n    <g class=\"playbutton\"></g>\n    <g class=\"playbar\"></g>\n  </svg>\n</div>\n"; // template

  var PlayControls = /*#__PURE__*/function () {
    function PlayControls() {
      _classCallCheck(this, PlayControls);

      this.textHeight = 12;
      this.textBottomMargin = 2;
      this.highlightHeightDelta = 3;
      var obj = this;
      obj.node = html2element$2(template$c);
      var y = obj.textHeight + obj.textBottomMargin + obj.highlightHeightDelta; // Make a play button.

      obj.button = new PlayButton();
      obj.button.y = y;
      obj.node.querySelector("g.playbutton").appendChild(obj.button.node);
      obj.button.node.addEventListener("click", function (event) {
        // Get the action required based on the button icon.
        if (obj.t_play == obj.t_max) {
          obj.t_play = obj.t_min;
        } // if


        obj.playing = !obj.playing;
      }); // addEventListener
      // The bar is just a node at this point

      obj.bar = new PlayBar();
      obj.bar.y = y;
      obj.node.querySelector("g.playbar").appendChild(obj.bar.node);
      obj.bar.node.addEventListener("click", function (event) {
        // On click the playbar should register the correct time.
        // The tscale takes inputs in the svg coordinates, and the event returns them in the client coordinates. Therefore the client coordinates must be adjusted for the position of the SVG.
        var x1 = event.clientX;
        var x0 = obj.node.getBoundingClientRect().x;
        var t = obj.bar.tscale.range2dom(x1 - x0); // Now just set the t to the right value, and update the view.

        obj.bar.t_play = t;
        obj.bar.update(); // The playtime changed, therefore pause the video.

        obj.playing = false;
        obj.skipped = true;
      }); // addEventListener

      obj.bar.rebuild();
      obj.bar.update();
      obj.playing = false;
      obj.skipped = false; // Annotations. Comments should be based on the chapter tags I think. The discussion is intended to be based on observed events. The logical progress is that events need to first be identified, and then discussed in a separate step. There should be a single dialogue box, and in that one tags can be added. This allows a single comment to be seen in multiple threads. Replies will have to be handled separately. Eventually the user should also be able to pin comments.
    } // constructor


    _createClass(PlayControls, [{
      key: "t_domain",
      get: // set t_domain
      function get() {
        return [this.bar.t_min, this.bar.t_max];
      } // get t_domain
      ,
      set: function set(t) {
        // Since t is coming from a specific location, it should be the same reference always. Therefore == comparison is valid.
        var obj = this;

        if (t[0] != obj.bar.t_min || t[1] != obj.bar.t_max) {
          obj.bar.t_min = t[0];
          obj.bar.t_max = t[1];
          obj.bar.rebuild();
          obj.bar.update();
        } // if

      }
    }, {
      key: "playing",
      get: // set playing
      function get() {
        return this._playing;
      } // get playing
      // FUNCTIONALITY
      ,
      set: function set(v) {
        var obj = this;
        obj._playing = v;
        obj.update(v);
      }
    }, {
      key: "update",
      value: function update() {
        var obj = this;
        obj.button.update(obj.playing);
        obj.bar.update();
      } // update

    }]);

    return PlayControls;
  }(); // PlayControls

  function html2element$1(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim(); // Never return a text node of whitespace as the result

    return template.content.firstChild;
  } // html2element

  function joinDataToElements(data, elements, idAccessor) {
    // Find data that has no elements, find the elements that have data, and the leftover.
    var elementsArray = _toConsumableArray(elements);

    var elementsDataIds = elementsArray.map(function (el) {
      return idAccessor(el.__data__);
    });
    var g = elementsArray.reduce(function (acc, el) {
      var d = data.filter(function (d_) {
        return idAccessor(el.__data__) == idAccessor(d_);
      }); // filter

      if (d.length > 0) {
        el.__data__ = d[0];
        acc.update.push(el);
      } else {
        acc.exit.push(el);
      } // if


      return acc;
    }, {
      update: [],
      exit: []
    }); // filter

    g.enter = data.filter(function (d) {
      return !elementsDataIds.includes(idAccessor(d));
    }); // filter

    return g;
  } // joinDataToElements

  /*
  Maybe this one should be remade into a manager so it can keep add comments to itself. Otherwise they have to be routed outside.
  */

  var css$4 = {
    textarea: "\n    width: 100%;\n    border: none;\n    resize: none;\n    overflow: hidden;\n    max-height: 100px;\n  ",
    submitbutton: "\n    color: white;\n\tbackground-color: black;\n\tborder-radius: 4px;\n\tcursor: pointer;\n  "
  }; // css

  var template$b = "\n<div>\n  <textarea class=\"comment\" type=\"text\" rows=\"1\" placeholder=\"What do you think?\" style=\"".concat(css$4.textarea, "\"></textarea>\n  <button class=\"submit\" style=\"").concat(css$4.submitbutton, "\"><b>Submit</b></button>\n</div>\n"); // template

  var AddCommentForm = /*#__PURE__*/function () {
    function AddCommentForm(id) {
      _classCallCheck(this, AddCommentForm);

      this._user = "";
      var obj = this;
      obj.node = html2element$1(template$b);
      obj.viewid = id; // Author input got omitted because the author also needs to be known when voting on a comment, and I didn't want to implement an input there. That's why now there will be an overall login box that will control everything.

      obj.commentinput = obj.node.querySelector("textarea.comment");
      obj.submitbutton = obj.node.querySelector("button.submit");
      obj.commentinput.style.display = "block";
      obj.submitbutton.style.display = "none";

      obj.commentinput.oninput = function () {
        obj.update();
      }; // oninput

    } // constructor


    _createClass(AddCommentForm, [{
      key: "update",
      value: function update() {
        var obj = this; // Change the height

        obj.commentinput.style.height = "1px";
        obj.commentinput.style.height = obj.commentinput.scrollHeight + "px"; // Show or hide button.

        obj.submitbutton.style.display = obj.config ? "block" : "none";
      } // update

    }, {
      key: "clear",
      value: function clear() {
        var obj = this;
        obj.commentinput.value = "";
        obj.update();
      } // clear

    }, {
      key: "user",
      get: // set user
      function get() {
        return this._user;
      } // get user
      ,
      set: function set(name) {
        this._user = name;
        this.update();
      }
    }, {
      key: "config",
      get: function get() {
        var obj = this;
        return obj.commentinput.value && obj.user ? {
          author: obj.user,
          viewid: obj.viewid,
          text: obj.commentinput.value
        } : false;
      } // config

    }]);

    return AddCommentForm;
  }(); // AddCommentForm

  var css$3 = {
    button: "\n    border: none;\n\tbackground-color: white;\n\tcursor: pointer;\n  ",
    replybutton: "\n    color: gray;\n\tpadding: 0 0 0 0;\n  ",
    votenumberi: "\n    margin-left: 4px;\n  ",
    timestampspan: "\n    color: gray;\n\tfont-size: 14px;\n\tmargin-left: 12px;\n  "
  }; // css

  var template$a = "\n<div class=\"comment\">\n  <div class=\"header\">\n    <b class=\"author\"></b>\n\t<span class=\"timestamp\" style=\"".concat(css$3.timestampspan, "\"></span>\n  </div>\n  <div class=\"body\"></div>\n  <div class=\"footer\">\n    <button class=\"upvote\" style=\"").concat(css$3.button, "\">\n\t  <i class=\"fa fa-thumbs-up\"></i>\n\t  <i class=\"vote-number\"></i>\n\t</button>\n\t<button class=\"downvote\" style=\"").concat(css$3.button, "\">\n\t  <i class=\"fa fa-thumbs-down\"></i>\n\t  <i class=\"vote-number\" style=\"").concat(css$3.votenumberi, "\"></i>\n\t</button>\n\t<button class=\"reply\" style=\"").concat(css$3.button, " ").concat(css$3.replybutton, "\"><b>REPLY</b></button>\n  </div>\n</div>\n"); // template

  var Comment = /*#__PURE__*/function () {
    function Comment(config) {
      _classCallCheck(this, Comment);

      this.user = "Default User: Aljaz";
      var obj = this; // Make a new node.

      obj.node = html2element$1(template$a); // Fill the template with the options from the config. There must be a comment, and there must be an author.

      obj.config = config; // Upon creation the author is also the user? True when the user makes them, not otherwise... But the user is updated when the login is initiated.

      obj.user = obj.config.author; // Fill some options that may not be defined in config.

      obj.config.time = config.time ? config.time : Date();
      obj.config.upvotes = config.upvotes ? config.upvotes : [];
      obj.config.downvotes = config.downvotes ? config.downvotes : [];
      obj.config.tags = config.tags ? config.tags : []; // Modify the node to reflect the config.

      var header = obj.node.querySelector("div.header");
      header.querySelector("b.author").innerText = config.author;
      var body = obj.node.querySelector("div.body");
      body.innerText = config.text;
      obj.update(); // Add the upvoting and downvoting. Where will the author name come from?? The upvote/downvote buttons should also be colored depending on whether the current user has upvoted or downvoted the comment already. Maybe the top app should just push the current user to the elements, and then they can figure out how to handle everything. That means that the functionality can be implemented here.

      var footer = obj.node.querySelector("div.footer");

      footer.querySelector("button.upvote").onclick = function () {
        obj.upvote(obj.user);
      }; // onclick


      footer.querySelector("button.downvote").onclick = function () {
        obj.downvote(obj.user);
      }; // onclick

    } // constructor


    _createClass(Comment, [{
      key: "id",
      get: function get() {
        var obj = this;
        return [obj.config.viewid, obj.config.author, obj.config.time].join(" ");
      } // get id

    }, {
      key: "update",
      value: function update() {
        // Only the time is allowed to be updated (if it will be calculated back), and the up and down votes.
        var obj = this;
        obj.updateTimestamp();
        obj.updateVoteCounter("upvote");
        obj.updateVoteCounter("downvote");
      } // update

    }, {
      key: "updateTimestamp",
      value: function updateTimestamp() {
        var obj = this;
        var timestamp = obj.node.querySelector("div.header").querySelector("span.timestamp"); // Dates are saved as strings for ease of comprehension. For formatting they are first translated into miliseconds passed since 1970.

        var t = obj.config.time;
        var now = Date.now();
        var stamp = Date.parse(t);
        var dayInMiliseconds = 1000 * 60 * 60 * 24;
        var todayInMiliseconds = getDayInMiliseconds(now); // Format the time so that it shows everything from today as n minutes/hours ago, everything from yesterday as yesterday at :... and everything else as the date. 

        if (stamp > now - todayInMiliseconds) {
          // This was today, just report how long ago.
          timestamp.innerText = getAgoFormattedString(now - stamp);
        } else if (stamp > now - todayInMiliseconds - dayInMiliseconds) {
          // Yesterday at HH:MM
          timestamp.innerText = "Yesterday at ".concat(t.split(" ").splice(4, 1)[0]);
        } else {
          // Just keep the first 4 parts which should be day name, month name, day number, year number
          timestamp.innerText = t.split(" ").splice(0, 4).join(" ");
        } // if

      } // updateTimestamp

    }, {
      key: "updateVoteCounter",
      value: function updateVoteCounter(buttonClassName) {
        var obj = this;
        var button = obj.node.querySelector("div.footer").querySelector("button.".concat(buttonClassName));
        var icon = button.querySelector("i.fa");
        var counter = button.querySelector("i.vote-number");
        var n = 0;

        switch (buttonClassName) {
          case "upvote":
            n = obj.config.upvotes.length;
            counter.innerText = n > 0 ? n : "";
            icon.style.color = obj.config.upvotes.includes(obj.user) ? "green" : "black";
            break;

          case "downvote":
            n = obj.config.downvotes.length;
            counter.innerText = n > 0 ? -n : "";
            icon.style.color = obj.config.downvotes.includes(obj.user) ? "tomato" : "black";
            break;
        } // switch

      } // updateVoteCounter
      // Maybe these should also allow the neutering of an upvote/downvote?

    }, {
      key: "upvote",
      value: function upvote(author) {
        var obj = this;
        pushValueToAWhichCompetesWithB(author, obj.config.upvotes, obj.config.downvotes);
        obj.update();
      } // upvote

    }, {
      key: "downvote",
      value: function downvote(author) {
        var obj = this;
        pushValueToAWhichCompetesWithB(author, obj.config.downvotes, obj.config.upvotes);
        obj.update();
      } // upvote

    }]);

    return Comment;
  }(); // Comment

  function pushValueToAWhichCompetesWithB(value, A, B) {
    if (!A.includes(value)) {
      A.push(value);

      if (B.includes(value)) {
        B.splice(B.indexOf(value), 1);
      } // if

    } // if

  } // pushValueToAWhichCompetesWithB


  function getDayInMiliseconds(msdate) {
    // 'msdate' is a date in miliseconds from 1970. Calculate how many miliseconds have already passed on the day that msdate represents.
    var d = new Date(msdate);
    return ((d.getHours() * 60 + d.getMinutes()) * 60 + d.getSeconds()) * 1000 + d.getMilliseconds();
  } // getDayInMiliseconds


  function getAgoFormattedString(delta) {
    // delta is the number of miliseconds ago for which this should return a human readable string. If delta is more than a day, then the result is returned as days.
    var seconds = Math.floor(delta / 1000);
    var minutes = Math.floor(seconds / 60);
    var hours = Math.floor(minutes / 60);
    var days = Math.floor(hours / 24);

    if (days > 0) {
      return "".concat(days, " days ago");
    } // if


    if (hours > 0) {
      return "".concat(hours, " hours ago");
    } // if


    if (minutes > 0) {
      return "".concat(minutes, " minutes ago");
    } // if


    return "".concat(seconds, " seconds ago");
  } // getAgoFormattedString

  var ReplyComment = /*#__PURE__*/function (_Comment) {
    _inherits(ReplyComment, _Comment);

    var _super = _createSuper(ReplyComment);

    function ReplyComment(config) {
      var _this;

      _classCallCheck(this, ReplyComment);

      _this = _super.call(this, config);

      var obj = _assertThisInitialized(_this); // The secondary comments need to be indented.


      obj.node.style.marginLeft = "20px"; // Replies can't be replied to. Maybe allow them too, but just put a hashtagged name in front?

      obj.node.querySelector("button.reply").remove();
      return _this;
    } // constructor


    return ReplyComment;
  }(Comment); // ReplyComment

  // Sort the comments before passing them to the comments below. How will replies be updated? Ultimately everything should be coming from the server??
  // This is just a template for the controls which allow the replies to be expanded or collapsed. These are invisible at first.

  var template$9 = "\n<div style=\"display: none;\">\n  <div class=\"expand-controls\" style=\"color: blue; cursor: pointer;\">\n    <i class=\"fa fa-caret-down\"></i>\n\t<i class=\"control-text\">View replies</i>\n  </div>\n  <div class=\"replies\" style=\"display: none;\"></div>\n</div>\n"; // Maybe the general comments can be added on top, but the replies should follow in chronological order.

  var GeneralComment = /*#__PURE__*/function (_Comment) {
    _inherits(GeneralComment, _Comment);

    var _super = _createSuper(GeneralComment);

    function GeneralComment(config) {
      var _this;

      _classCallCheck(this, GeneralComment);

      _this = _super.call(this, config);
      _this.replies = [];

      var obj = _assertThisInitialized(_this); // The general comment can have replies associated with it. Handle these here. Furthermore an additional control for expanding, reducing hte comments is required.


      obj.replynode = html2element$1(template$9);
      obj.node.appendChild(obj.replynode); // Add the functionality to the caret.

      obj.repliesExpanded = false;

      obj.replynode.querySelector("div.expand-controls").onclick = function () {
        obj.repliesExpanded = !obj.repliesExpanded;
        obj.update();
      }; // onclick
      // Replies on the config need to be initialised. But actually, they should be stored as separate entries for ease of updating...


      obj.update();
      return _this;
    } // constructor


    _createClass(GeneralComment, [{
      key: "reply",
      value: function reply(replyconfig) {
        // Replies can also need to be updated if the server pushes an updated version. In that case handle the replacement here.
        var obj = this; // Make a comment node, and append it to this comment.

        replyconfig.parentid = obj.id;
        var r = new ReplyComment(replyconfig);
        var existing = findArrayItemById$1(obj.replies, r.id);

        if (existing) {
          obj.replaceReply(existing, r);
        } else {
          // Add this one at the end.
          obj.replynode.querySelector("div.replies").appendChild(r.node);
          obj.replies.push(r);
        } // if
        // Update the view.


        obj.update();
      } // reply

    }, {
      key: "replaceReply",
      value: function replaceReply(existing, replacement) {
        // For simplicity handle the replacing of hte comment here.
        var obj = this; // Update the internal comments store.

        obj.replies.splice(obj.replies.indexOf(existing), 1, replacement); // Update teh DOM.

        var container = obj.node.querySelector("div.replies");
        container.insertBefore(replacement.node, existing.node);
      } // replaceReply

    }, {
      key: "update",
      value: function update() {
        // Only the time is allowed to be updated (if it will be calculated back), and the up and down votes.
        var obj = this; // From superclass

        obj.updateTimestamp();
        obj.updateVoteCounter("upvote");
        obj.updateVoteCounter("downvote"); // GeneralComment specific.

        obj.updateReplies();
      } // update

    }, {
      key: "updateReplies",
      value: function updateReplies() {
        var obj = this; // First update is called when the superclass constructor is called.

        if (obj.replies) {
          var n = obj.replies.length;
          obj.replynode.style.display = n > 0 ? "" : "none"; // View replies or hide replies

          var s = n == 1 ? "y" : "ies (".concat(n, ")");
          obj.replynode.querySelector("div.expand-controls").querySelector("i.control-text").innerText = obj.repliesExpanded ? "Hide repl".concat(s) : "View repl".concat(s);
          obj.replynode.querySelector("div.expand-controls").querySelector("i.fa").classList.value = obj.repliesExpanded ? "fa fa-caret-up" : "fa fa-caret-down";
          obj.replynode.querySelector("div.replies").style.display = obj.repliesExpanded ? "" : "none";
        } // if

      } // updateReplies

    }]);

    return GeneralComment;
  }(Comment); // GeneralComment

  function findArrayItemById$1(A, id) {
    var candidates = A.filter(function (a) {
      return a.id == id;
    }); // filter

    return candidates.length > 0 ? candidates[0] : false;
  } // findArrayItemById

  var template$8 = "\n<div style=\"margin-bottom: 5px;\"></div>\n"; // template
  // Maybe make them grey with italis writing?

  var css$2 = "\nborder: none;\nbackground-color: gainsboro;\nmargin-right: 2px;\ncursor: pointer;\n"; // css

  var tagtemplate = "\n<button style=\"".concat(css$2, "\"><i></i></button>\n"); // A general tag should always be present. This tag should then show all comments without tags.

  var DiscussionSelector = /*#__PURE__*/function () {
    function DiscussionSelector() {
      _classCallCheck(this, DiscussionSelector);

      this.tags = [];
      this.selected = [];
      var obj = this;
      obj.node = html2element$1(template$8);
    } // constructor


    _createClass(DiscussionSelector, [{
      key: "update",
      value: function update(newtags) {
        var obj = this;

        if (newtags) {
          // Replace the tags if necessary. The same tags should be grouped together, but different authors may have differing views on what constitutes features.
          obj.tags = newtags;
          obj.selected = obj.selected.filter(function (d) {
            return newtags.includes(d);
          });
          obj.externalAction();
        } // if


        var buttons = joinDataToElements(obj.tags, obj.node.querySelectorAll("button"), function (d) {
          return d;
        });
        buttons.enter.forEach(function (d) {
          var el = html2element$1(tagtemplate);
          obj.node.appendChild(el);
          el.querySelector("i").innerText = d;
          el.__data__ = d;

          el.onclick = function () {
            obj.toggle(el);
          }; // onclick

        }); // forEach

        buttons.exit.forEach(function (button) {
          return button.remove();
        });
      } // update

    }, {
      key: "toggle",
      value: function toggle(el) {
        var obj = this;

        if (obj.selected.includes(el.__data__)) {
          obj.selected.splice(obj.selected.indexOf(el.__data__), 1);
          el.style.fontWeight = "";
        } else {
          obj.selected.push(el.__data__);
          el.style.fontWeight = "bold";
        } // if


        obj.externalAction();
      } // toggle
      // Placeholder that will allow the actual comments to be hidden. Maybe just name it that?

    }, {
      key: "externalAction",
      value: function externalAction() {} // externalAction

    }]);

    return DiscussionSelector;
  }(); // DiscussionSelector

  var template$7 = "\n<div class=\"commenting\" style=\"width:300px;\">\n  <div class=\"hideShowText\" style=\"cursor: pointer; margin-bottom: 5px; color: gray;\">\n    <b class=\"text\">Show comments</b>\n\t<b class=\"counter\"></b>\n\t<i class=\"fa fa-caret-down\"></i>\n  </div>\n  <div class=\"commentingWrapper\" style=\"display: none;\">\n    <div class=\"comment-form\"></div>\n    <hr>\n    <div class=\"comment-tags\"></div>\n    <div class=\"comments\" style=\"overflow-y: auto; max-height: 200px;\"></div>\n  </div>\n</div>\n"; // template

  var CommentingManager = /*#__PURE__*/function () {
    function CommentingManager(id) {
      _classCallCheck(this, CommentingManager);

      var obj = this;
      obj.node = html2element$1(template$7);
      obj.viewid = id;
      obj.comments = []; // Make the form;

      obj.form = new AddCommentForm(id);
      obj.node.querySelector("div.comment-form").appendChild(obj.form.node); // Make both replies and general comments to use a single form.

      obj.form.submitbutton.onclick = function () {
        var config = obj.form.config;

        if (config) {
          // The form should only be cleared if a comment was successfully added.
          config.tags = obj.discussion.selected.map(function (d) {
            return d;
          });
          obj.add(config);
          obj.form.clear();
        } // if

      }; // onclick
      // Add the comment tags, which serve as selectors of the discussion topics. This should be another module. At the saem time this one will have to update when the module is updated. Maybe the placeholder reactions function should just be defined here??


      obj.discussion = new DiscussionSelector();
      obj.node.querySelector("div.comment-tags").appendChild(obj.discussion.node); // obj.discussion.update(["#vortex", "#shock"])

      obj.discussion.externalAction = function () {
        obj.hideNonDiscussionComments();
      }; // externalAction
      // At the beginning show only general comments? Better yet, show no comments.


      obj.hideNonDiscussionComments(); // Finally add teh controls that completely hide comments.

      var hsdiv = obj.node.querySelector("div.hideShowText");
      var cdiv = obj.node.querySelector("div.commentingWrapper");

      hsdiv.onclick = function () {
        var hidden = cdiv.style.display == "none";
        cdiv.style.display = hidden ? "" : "none"; // It changed from hidden to show, but hidden is past state.

        hsdiv.querySelector("b.text").innerText = hidden ? "Hide comments" : "Show comments";
        hsdiv.querySelector("i").classList.value = hidden ? "fa fa-caret-up" : "fa fa-caret-down";
      }; // onclick

    } // constructor


    _createClass(CommentingManager, [{
      key: "hideNonDiscussionComments",
      value: function hideNonDiscussionComments() {
        var obj = this;
        obj.comments.forEach(function (comment) {
          // This should really be select any!
          var pertinent = obj.discussion.selected.length == 0 || obj.discussion.selected.some(function (d) {
            return comment.config.tags.includes(d);
          });
          comment.node.style.display = pertinent ? "" : "none";
        }); // forEach
      } // hideNonDiscussionComments

    }, {
      key: "updateCommentCounter",
      value: function updateCommentCounter() {
        var obj = this;
        var n = obj.comments.reduce(function (acc, c) {
          acc += 1;
          acc += c.replies.length;
          return acc;
        }, 0);
        var counterNode = obj.node.querySelector("div.hideShowText").querySelector("b.counter");
        counterNode.innerText = n ? "(".concat(n, ")") : "";
      } // updateCommentCounter

    }, {
      key: "submit",
      value: function submit(config) {
        // This function is called when the button is pressed. By default it just routes the comment to 'add' so that the comment is added straight away. Alternately it should be passed to the server first. Maybe it's good if both things are done in cases when the connection is not good?
        this.add(config);
      } // submit

    }, {
      key: "clear",
      value: function clear() {
        var obj = this;
        obj.comments = [];
        var commentsToRemove = obj.node.querySelector("div.comments").children;

        for (var i = 0; i < commentsToRemove.length; i++) {
          commentsToRemove[i].remove();
        } // for

      } // clear

    }, {
      key: "add",
      value: function add(config) {
        // When the comments are loaded from the server they will be added through this interface. Therefore it must handle both the primary and secondary comments.
        var obj = this;

        if (config.parentid) {
          // Comments that have a parent id are replies. Find the right parent comment.
          obj.addReplyComment(config);
        } else {
          // It's a general comment. 
          obj.addGeneralComment(config);
        } // if
        // Update the comments count.


        obj.hideNonDiscussionComments();
        obj.updateCommentCounter();
      } // add

    }, {
      key: "addReplyComment",
      value: function addReplyComment(config) {
        var obj = this;
        var parent = findArrayItemById(obj.comments, config.parentid);

        if (parent) {
          parent.reply(config);
        } // if

      } // addReplyComment

    }, {
      key: "addGeneralComment",
      value: function addGeneralComment(config) {
        var obj = this; // If there is an existing one, that one should be updated. Whatever is coming from the server is the truth. Maybe it'll be simpler just to replace the comment in that case?? The comment config does not contain hte comment id, which is computed....
        // Generally new comments should be attached at teh top. Here the attachment point is variable to reuse this method as a way to replace an existing comment with the same id.

        var c = new GeneralComment(config); // Remove the existing one, and replace it with the current one.

        var existing = findArrayItemById(obj.comments, c.id);

        if (existing) {
          obj.replaceGeneralComment(existing, c);
        } else {
          obj.comments.push(c); // Add the functionality to add secondary comments:

          c.node.querySelector("button.reply").onclick = function () {
            if (obj.form.config) {
              c.reply(obj.form.config);
              obj.form.clear();
            } // if

          }; // onclick
          // Insert the new comment at teh very top.


          var container = obj.node.querySelector("div.comments");
          container.insertBefore(c.node, container.firstChild);
        } // if

      } // addGeneralComment

    }, {
      key: "replaceGeneralComment",
      value: function replaceGeneralComment(existing, replacement) {
        // For simplicity handle the replacing of hte comment here.
        var obj = this; // Update the internal comments store.

        obj.comments.splice(obj.comments.indexOf(existing), 1, replacement); // Update teh DOM.

        var container = obj.node.querySelector("div.comments");
        container.insertBefore(replacement.node, existing.node);
      } // replaceGeneralComment

    }, {
      key: "user",
      get: function get() {
        return this.form.user;
      } // get user
      ,
      set: function set(name) {
        var obj = this; // The form has a change of author.

        obj.form.user = name; // The comment appearance and functionality changes depends on who is checking them.

        obj.comments.forEach(function (comment) {
          comment.user = name;
          comment.update();
        }); // forEach
      } // set user

    }, {
      key: "getCommentsForSaving",
      value: function getCommentsForSaving() {
        // The obj.comments is an array of GeneralComment instances, and just the configs have to be collected before being passed on. Collect them here.
        var obj = this; // Note that the general comments hold the reply comments. Extract the secondary comments here and store them in a single layer array for ease of updating the changes on the server.

        return obj.comments.reduce(function (acc, comment) {
          acc.push(comment.config);
          acc.push.apply(acc, _toConsumableArray(comment.replies.map(function (reply) {
            return reply.config;
          })));
          return acc;
        }, []);
      } // getCommentsForSaving

    }]);

    return CommentingManager;
  }(); // CommentingManager

  function findArrayItemById(A, id) {
    var candidates = A.filter(function (a) {
      return a.id == id;
    }); // filter

    return candidates.length > 0 ? candidates[0] : false;
  } // findArrayItemById
   // arrayIncludesAll

  var css$1 = {
    button: "\n    border: none;\n\tcursor: pointer;\n\tborder-radius: 4px;\n  ",
    timebutton: "\n    background-color: gainsboro;\n  ",
    submitbutton: "\n    background-color: black;\n\tcolor: white;\n  "
  }; // css

  var template$6 = "\n<div style=\"300px\">\n  <input type=\"text\" placeholder=\"#tag-name\" style=\"width: 100px;\"></input>\n  \n  <div style=\"display: inline-block; float: right;\">\n  <button class=\"starttime\" style=\"".concat(css$1.button, " ").concat(css$1.timebutton, "\">start</button>\n  <i>-</i>\n  <button class=\"endtime\" style=\"").concat(css$1.button, " ").concat(css$1.timebutton, "\">end</button>\n  <button class=\"submit\" style=\"").concat(css$1.button, " ").concat(css$1.submitbutton, "\">\n    Submit\n  </button>\n  </div>\n  \n  \n</div>\n"); // template

  var ChapterForm = /*#__PURE__*/function () {
    function ChapterForm() {
      _classCallCheck(this, ChapterForm);

      this.user = "Default user: Aljaz";
      var obj = this;
      obj.node = html2element$2(template$6);
      obj.input = obj.node.querySelector("input"); // This value will be overwritten during interactions, and is where the tag manager collects the time for the timestamps.

      obj.t = 0;
      obj.clear(); // The button should cycle through black, green, and red. It will need some way of tracking its current state, and a way to load in existing tags! This will allow users to subsequently change the tag if needed? Maybe this is a bit much for now. It will need a submit button.
      // If the tag is loaded and the button switches to timestamping then any user can add the ned timesteps. Then the users name needs to be checked in addition. Maybe some way of filtering out the tags that are added? How would that work?
      // For now add 3 buttons. A starttime endtime and submit button. For the submit button only the start and name need to be filled in. The buttons must also show the selected times!
      // If one of the times is set, it should check with the other time to make sure it's set correctly.

      obj.node.querySelector("button.starttime").onclick = function () {
        obj.starttime = obj.t;
        obj.update();
      }; // onclick


      obj.node.querySelector("button.endtime").onclick = function () {
        obj.endtime = obj.t;
        obj.update();
      }; // onclick


      obj.node.querySelector("button.submit").onclick = function () {
        var tag = obj.tag;

        if (tag) {
          obj.submit(tag);
          obj.clear();
        } // if

      }; // onclick


      obj.input.oninput = function () {
        obj.update();
      }; // oninput

    } // constructor


    _createClass(ChapterForm, [{
      key: "update",
      value: function update() {
        var obj = this; // Ensure that the times are always consistent (end > start);

        if (obj.endtime && obj.starttime) {
          var t0 = Math.min(obj.starttime, obj.endtime);
          var t1 = Math.max(obj.starttime, obj.endtime);
          obj.starttime = t0;
          obj.endtime = t1;
        } // if
        // Update the time tags also.


        var it0 = obj.node.querySelector("button.starttime");
        var it1 = obj.node.querySelector("button.endtime");
        it0.innerText = obj.starttime != undefined ? obj.starttime.toFixed(3) : "start";
        it1.innerText = obj.endtime != undefined ? obj.endtime.toFixed(3) : "end"; // The button is black by default, and making it look disabled is a bit more involved.

        var button = obj.node.querySelector("button.submit");

        if (obj.tag) {
          // Enable.
          button.style.opacity = 1;
          button.style.backgroundColor = "black";
          button.style.color = "white";
        } else {
          button.style.opacity = 0.6;
          button.style.backgroundColor = "gainsboro";
          button.style.color = "black";
        } // if

      } // update

    }, {
      key: "clear",
      value: function clear() {
        var obj = this;
        obj.starttime = undefined;
        obj.endtime = undefined;
        obj.input.value = "";
        obj.update();
      } // clear

    }, {
      key: "tag",
      get: function get() {
        // Chapter tag should belong to the task id so that the observations across multiple slices are available together to the user.
        var obj = this; // The time should be defined, but it can also be 0, or less than 0!

        return obj.user && obj.input.value && obj.starttime != undefined ? {
          taskId: obj.taskId,
          label: obj.input.value,
          author: obj.user,
          starttime: obj.starttime,
          endtime: obj.endtime,
          id: "".concat(obj.user, " ").concat(Date())
        } : false;
      } // tag
      // Placeholder for communication between classes.

    }, {
      key: "submit",
      value: function submit(tag) {} // submit

    }]);

    return ChapterForm;
  }(); // ChapterForm

  // On the other hand, when discussing the tags it's good to avoid misunderstaning.
  // Furthermore, it would be good to just accept someone elses tags. What about clicking on the users name? Then select adopting their annotations? How do you revert back? A clear all button? Allow reloading of annotations for editing??
  // Anyway, the commenting should show all possible annotations.
  // What about showing the most popular annotations by default?? Ideally, the annotations would show up when the comment addressing them would be hovered over.

  var template$5 = "\n<div>\n  <div class=\"playcontrols-wrapper\"></div>\n  <div class=\"chapterform-wrapper\"></div>\n  <div class=\"commenting-wrapper\"></div>\n</div>\n"; // template

  var interactivePlayerUI = /*#__PURE__*/function () {
    function interactivePlayerUI(id) {
      _classCallCheck(this, interactivePlayerUI);

      var obj = this;
      obj.viewid = id;
      obj.node = html2element$2(template$5);
      obj.playControlsWrapperNode = obj.node.querySelector("div.playcontrols-wrapper");
      obj.chapterFormWrapperNode = obj.node.querySelector("div.chapterform-wrapper");
      obj.commentingWrapperNode = obj.node.querySelector("div.commenting-wrapper"); // Add in a playbar

      obj.playcontrols = new PlayControls();
      obj.playControlsWrapperNode.appendChild(obj.playcontrols.node); // The tag adding.

      obj.chapterform = new ChapterForm();
      obj.chapterFormWrapperNode.appendChild(obj.chapterform.node); // Add in the commenting system. The metadata filename is used as the id of this 'video', and thus this player. The node needs to be added also.

      obj.commenting = new CommentingManager(id);
      obj.commentingWrapperNode.appendChild(obj.commenting.node); //  Tags need to be pushed to the playbar, but also to the commenting! Should individual tags be allowed to influence the navigation? I guess so?

      obj.chapterform.submit = function (tag) {
        obj.playcontrols.bar.addchapter(tag);
        var discussiontags = obj.playcontrols.bar.annotations.map(function (a) {
          return a.label;
        });
        obj.commenting.discussion.update(discussiontags);
      }; // submit
      // Add onhover events to the tagged keywords in the text? That allows the user to show exactly which part of the data they meant, and also to compare it to others interpretations.
      // What happens when the user replies in a thread for which he does not have an annotation for? For replies, it's the parent annotations that get pasted in. But what if you're making a general comment without having the playbar annotations? Which one should get selected? Or should just the text tags be retained? But in that case I can't show the different versions. Maybe keep the tag names, but also keep the annotations separate - that way they can only be added for mouseover if they're in hte text? And in the text they need to be marked using a #? But then no disagreements with the thread parent comment are possible... How to deal with this? Only allow the user to use their own annotations?
      // Anyyyyyway, first include the tree navigation

    } // constructor

    /*
    Getters and setters to simplify the API:
    t_domain
    t
    playing
    skipped
    user
    */


    _createClass(interactivePlayerUI, [{
      key: "playing",
      get: function get() {
        return this.playcontrols.playing;
      } // get playing

    }, {
      key: "skipped",
      get: function get() {
        return this.playcontrols.skipped;
      } // get skipped
      ,
      set: function set(v) {
        this.playcontrols.skipped = false;
      } // set skipped

    }, {
      key: "t_play",
      get: function get() {
        return this.playcontrols.bar.t_play;
      } // get t_play
      ,
      set: function set(t) {
        this.chapterform.t = t;
        this.playcontrols.bar.t_play = t;
        this.playcontrols.bar.update();
      } // set t_play

    }, {
      key: "t_domain",
      get: function get() {
        return this.playcontrols.t_domain;
      } // get t_domain
      ,
      set: function set(t) {
        this.playcontrols.t_domain = t;
      } // set t_domain

    }, {
      key: "user",
      get: function get() {
        // The annotation form is the primary annotation.
        return this.chapterform.user;
      } // get user
      ,
      set: function set(name) {
        this.commenting.user = name;
        this.chapterform.user = name;
      } // set user

    }, {
      key: "metadata",
      get: // set metadata
      function get() {
        return this._metadata;
      } // set metadata
      ,
      set: function set(m) {
        this._metadata = m;
        this.chapterform.taskId = m.taskId;
      }
    }]);

    return interactivePlayerUI;
  }(); // interactivePlayerUI

  // It's advantageous to inherit from ViewFrame2D because the geometry changes on the go - first some dummy geometry is specified, and after the actual geometry is loaded in that just gets automatically used on next FrameAnimationRate step. If the ViewFrame is a module then the UnsteadyPlayer has to monitor when the geometry changes, and update the ViewFrame accordingly.
  // Because it's advantageous to inherit from ViewFrame2D it is also advantageous to create the outside html player wrapper in it. Then the unsteady player only needs to add other modules into it.

  var UnsteadyPlayer2D = /*#__PURE__*/function (_ViewFrame2D) {
    _inherits(UnsteadyPlayer2D, _ViewFrame2D);

    var _super = _createSuper(UnsteadyPlayer2D);

    function UnsteadyPlayer2D(gl, unsteadyMetadataFilename) {
      var _this;

      _classCallCheck(this, UnsteadyPlayer2D);

      _this = _super.call(this, gl);

      var obj = _assertThisInitialized(_this); // Actual geometry to be drawn.


      obj.geometry = new Mesh2D(gl, unsteadyMetadataFilename); // The FPS at which to swap out data.

      obj.fps = 24;
      obj.dt = 1000 / obj.fps;
      obj.timelastdraw = 0; // Add in precofigured UI. The metadata filename identifies this small multiple.

      obj.ui = new interactivePlayerUI(unsteadyMetadataFilename);
      obj.node.appendChild(obj.ui.node);
      return _this;
    } // constructor


    _createClass(UnsteadyPlayer2D, [{
      key: "update",
      value: function update(now) {
        var obj = this; // Compute the view matrices

        obj.computeModelMatrix();
        obj.computeViewMatrix();
        obj.computeOrthographicMatrix(); // Will the rendering loop have to be redone in order to allow promises to be returned to ensure that the player is ready for the next step?

        if (now > obj.timelastdraw + obj.dt) {
          if (obj.ui.playing) {
            obj.timelastdraw = now;
            obj.incrementTimeStep();
          } else if (obj.ui.skipped) {
            obj.timelastdraw = now;
            obj.incrementTimeStep(0);
            obj.ui.skipped = false;
          } // if

        } // if
        // The time domain can only be known AFTER the metadata is loaded. But, after the timesteps are updated the playcontrols need to be updated too. Specifically, the chapters need to be rebuild because they are independent of the actual annotations. But they currently don't need to be! Yes, they do - e.g. padding etc.


        obj.ui.t_domain = obj.geometry.domain.t;
      } // update

    }, {
      key: "incrementTimeStep",
      value: function incrementTimeStep(dt) {
        /*
        The small multiple should be able to play on its own. In that case it should just update the data 24 times per second.
        
        It should of course support playing several small multiples at once. If the 'dt' for all the simulations are the same then playing several at once just requires an input that will toggle several small multiples on at the same time. If the 'dt' are not the same, then it becomes more difficult because the data can't be loaded by incrementing, and instead a desired time must be passed to the player. Furthermore, the player should support several small multiples to be played at once, but starting from different times. In those cases the player must keep track of the time increment total to ensure all small multiples move by the same amount.
        
        For now the playbar can just play forward correctly, and the t_play can be used to keep track of the actual playing time. The dt is just added on to that time them.
        */
        var obj = this;

        if (dt >= 0) {
          var t_new = obj.ui.t_play + dt;
          obj.geometry.timestepCurrentFrame(t_new);
          obj.ui.t_play = t_new;
        } else {
          obj.geometry.incrementCurrentFrame();
          obj.ui.t_play = obj.geometry.currentTime;
        } // if


        obj.geometry.updateCurrentFrameBuffer();
      } // incrementTimeStep

    }]);

    return UnsteadyPlayer2D;
  }(ViewFrame2D); // UnsteadyPlayer2D

  var vertshader = "\n//Each point has a position and color\nattribute vec2 position;\nattribute float value;\n\n// The transformation matrices\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 projection;\n\n// Pass the color attribute down to the fragment shader\nvarying float v_uint_colorval;\n\nvoid main() {\n  \n  // Pass the color down to the fragment shader.\n  v_uint_colorval = value;\n  \n  // Read the multiplication in reverse order, the point is taken from the original model space and moved into world space. It is then projected into clip space as a homogeneous point. Generally the W value will be something other than 1 at the end of it.\n  gl_Position = projection * view * model * vec4( position, 0.0, 1.0 );\n}";
  var fragshader = "\nprecision mediump float;\nvarying float v_uint_colorval;\n\nuniform sampler2D colormap;\nuniform float u_cmin, u_cmax;\nuniform float u_uint_cmin, u_uint_cmax;\n\nvoid main() {\n  gl_FragColor = texture2D(colormap, vec2( ( (v_uint_colorval/255.0*(u_uint_cmax-u_uint_cmin)+u_uint_cmin) - u_cmin)/(u_cmax-u_cmin), 0.5));;\n}"; // A viridis colormap. Values for color channels in frag shader should be [0, 1].

  var cmap = new Uint8Array([68, 1, 84, 255, 71, 19, 101, 255, 72, 36, 117, 255, 70, 52, 128, 255, 65, 68, 135, 255, 59, 82, 139, 255, 53, 95, 141, 255, 47, 108, 142, 255, 42, 120, 142, 255, 37, 132, 142, 255, 33, 145, 140, 255, 30, 156, 137, 255, 34, 168, 132, 255, 47, 180, 124, 255, 68, 191, 112, 255, 94, 201, 98, 255, 122, 209, 81, 255, 155, 217, 60, 255, 189, 223, 38, 255, 223, 227, 24, 255, 253, 231, 37, 255]); // cmap

  var MeshRenderer2D = /*#__PURE__*/function () {
    function MeshRenderer2D(canvas, container) {
      _classCallCheck(this, MeshRenderer2D);

      var obj = this;
      obj.domcontainer = container;
      obj.canvas = canvas;
      obj.canvas.width = window.innerWidth;
      obj.canvas.height = window.innerHeight; // Grab a context and setup a program.

      var gl = canvas.value = canvas.getContext("webgl", {
        antialias: true,
        depth: false
      }); // The extension is needed to allow indices to be uint32.

      gl.getExtension("OES_element_index_uint"); // console.log("can uints be used? ", uints_for_indices)

      obj.webglProgram = setupProgram(gl);
      obj.gl = gl; // The texture represents a solorbar, and stores the color values. It is indexed on a range of 0 - 1. The index is computed in the colorshader.
      // gl.texImage2D( ... , width, height, border, format, type, ArrayBuffer)

      obj.colormapTexture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, obj.colormapTexture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 21, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, cmap);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE); // Collection of plots to draw.

      obj.items = [];
    } // constructor


    _createClass(MeshRenderer2D, [{
      key: "draw",
      value: function draw() {
        var obj = this;
        var gl = obj.gl; // Common current time. This should be changed so that it starts from when the user presses a play. Furthermore the views should be either linked or individual

        var now = performance.now(); // Move the canvas to the right position for scrolling.

        gl.canvas.style.transform = "translateY(".concat(window.scrollY, "px)"); // The actual drawing loop.

        obj.items.forEach(function (item) {
          // Check whether the item is visible or not.
          if (obj.isItemVisible(item)) {
            // Update the ViewFrame to calculate new transform matrices. Nothing (camera, model, zoom) moves as a function of time. Time is still passed in to synchronise the player updates.
            item.update(now); // Update the data going to the GPU

            obj.updateAttributesAndUniforms(item); // Set the rectangle to draw to. Scissor clips, viewport transforms the space. The viewport seems to be doing the scissoring also...

            obj.updateViewport(item); // Perform the actual draw. gl.UNSIGNED_INT allows teh use of Uint32Array indices, but the 'OES_element_index_uint' extension had to be loaded.

            gl.drawElements(gl.TRIANGLES, item.geometry.indicesLength, gl.UNSIGNED_INT, 0);
          } // if

        }); // forEach

        requestAnimationFrame(obj.draw.bind(obj));
      } // draw

    }, {
      key: "add",
      value: function add(meshMetadataFilename) {
        var obj = this; // let newplayer = new ViewFrame2D(obj.gl);

        var newplayer = new UnsteadyPlayer2D(obj.gl, meshMetadataFilename);
        obj.domcontainer.appendChild(newplayer.node);
        obj.items.push(newplayer); // Return the newplayer if metadata has to be added to it.

        return newplayer;
      } // add

    }, {
      key: "updateViewport",
      value: function updateViewport(item) {
        var gl = this.gl;
        gl.viewport.apply(gl, _toConsumableArray(item.viewport));
        gl.scissor.apply(gl, _toConsumableArray(item.viewport));
        gl.clearColor.apply(gl, [0, 0, 0, 0]);
      } // updateViewport
      // Maybe the update could be performed by the item itself. That way both 2D and 3D objects could potentially be drawn alongside. 
      // But the programme declares the variables it expects, so the program would have to be redone also, which means another webgl instance is needed, and thus another canvas.

    }, {
      key: "updateAttributesAndUniforms",
      value: function updateAttributesAndUniforms(item) {
        // 'item' is a 'ViewFrame' instance. This method needs to update the transformation matrices, which are owned by the 'ViewFrame' instance, as well as the geometry buffers owned by the 'ViewFrame.geometry' instance.
        // 'transforms' should have the 'model', 'projection', and 'view' transform 4x4 matrices that will be used to draw the scene.
        // In addition to that this update also requires the 'position' and 'color' buffers. So the entire geometry is needed here to update gl before drawing. 
        var obj = this;
        var gl = this.gl; // Locations are pointers to the GPU buffers. Transforms are the transformation matrices. Buffers are the geometry arrays.

        var locations = obj.webglProgram.locations;
        var transforms = item.transforms; // Update the transformations.

        gl.uniformMatrix4fv(locations.model, false, new Float32Array(transforms.model));
        gl.uniformMatrix4fv(locations.projection, false, new Float32Array(transforms.projection));
        gl.uniformMatrix4fv(locations.view, false, new Float32Array(transforms.view)); // Set the vertices attribute

        gl.enableVertexAttribArray(locations.position);
        gl.bindBuffer(gl.ARRAY_BUFFER, item.geometry.verticesBuffer);
        gl.vertexAttribPointer(locations.position, 2, gl.FLOAT, false, 0, 0); // Update the colors attribute

        gl.enableVertexAttribArray(locations.value);
        gl.bindBuffer(gl.ARRAY_BUFFER, item.geometry.valuesBuffer);
        gl.vertexAttribPointer(locations.value, 1, gl.FLOAT, false, 0, 0); // Update the indices attribute.

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, item.geometry.indicesBuffer);
        /* 
        vec2( (v_colorval-u_cmin)/(u_cmax-u_cmin), 0.5)
        
        v_colorval : [0, 255]
        u_cmin : variable min value
        u_cmax : variable max value
        
        First I need to map from [0, 255] to [a,b], then to [0,1]. The first [0,255] represents the frame specific uint encoding. The second encoding allows all the values to be drawn to the correct value across several files. However, the [0, 255] values are pushed to the GPU straight away, and both mappings must occur there.
        */
        // cmin/cmax give the global (for all small multiples) colorbar range.

        gl.uniform1f(locations.cmin, obj.globalColormapRange[0]); // 0   880

        gl.uniform1f(locations.cmax, obj.globalColormapRange[1]); // 255   920
        // uint_cmin/uint_cmax give the local (particular small multiple) colorbar range,

        gl.uniform1f(locations.uint_cmin, item.geometry.currentUintRange[0]); // 0   880

        gl.uniform1f(locations.uint_cmax, item.geometry.currentUintRange[1]); // 255   920

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, obj.colormapTexture);
        gl.uniform1i(locations.colormap, 0);
      } // updateAttributesAndUniforms
      // This should focus solely on hte view div rectangle!!

    }, {
      key: "isItemVisible",
      value: function isItemVisible(item) {
        // Check whether the current item is visible. (!!!!) Extend later to check whether other items obscure the current item.
        var obj = this; // The idea is to collect all the boundingClientRects, and check if any of the following items overlap it, in which case skip the drawing.
        // The limit is 16 items drawn at once. There can be more items in analysis at the same time, but only 16 drawn at once. This means that if the items overlap, there can be any number of them, as long as they are in maximum 15 piles.
        // It all really depends on the connection speed and the size of the files...

        var rect = item.node.querySelector("div.view").getBoundingClientRect();
        var isCovered = false;

        for (var i = obj.items.indexOf(item) + 1; i < obj.items.length; i++) {
          // Check if the i-th viewFrame covers this one. This is a simple version that skirts the problem of figuring out if a bunch of viewFrames collectively cover this viewFrame.
          // Maybe later on there can just be group interfaces added as a separate attribute, and those can be made to hide the other frames,
          var higherRect = obj.items[i].node.querySelector("div.view").getBoundingClientRect();
          isCovered = isCovered ? true : isRectInHigherRect(rect, higherRect);
        } // for


        return item.isOnScreen && !isCovered;
      } // isItemVisible

    }, {
      key: "globalColormapRange",
      get: function get() {
        var obj = this;
        return obj.items.reduce(function (acc, item) {
          // v is the domain across all the frames of an unsteady simulation instance.
          var v = item.geometry.domain.v;
          acc[0] = acc[0] > v[0] ? v[0] : acc[0];
          acc[1] = acc[1] < v[1] ? v[1] : acc[1];
          return acc;
        }, [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]);
      } // globalColormapRange

    }]);

    return MeshRenderer2D;
  }(); // MeshRenderer2D

  function isRectInHigherRect(rect, higherRect) {
    // For it to be in hte rect it must be in the x and y range of the rect.
    return higherRect.left <= rect.left && rect.right <= higherRect.right && higherRect.top <= rect.top && rect.bottom <= higherRect.bottom;
  } // isPointInRect


  function setupProgram(gl) {
    // WHAT EXACTLY DOES TWGL DO THAT I CAN'T DO MYSELF?
    // Setup a WebGL program
    var webglProgram = createProgramInfo(gl, [vertshader, fragshader]);
    var program = webglProgram.program;
    gl.useProgram(program); // Save the attribute and uniform locations

    var loc_model = gl.getUniformLocation(program, "model");
    var loc_view = gl.getUniformLocation(program, "view");
    var loc_projection = gl.getUniformLocation(program, "projection");
    var loc_colormap = gl.getUniformLocation(program, "colormap");
    var loc_cmax = gl.getUniformLocation(program, "u_cmax");
    var loc_cmin = gl.getUniformLocation(program, "u_cmin");
    var loc_uint_cmax = gl.getUniformLocation(program, "u_uint_cmax");
    var loc_uint_cmin = gl.getUniformLocation(program, "u_uint_cmin");
    var loc_position = gl.getAttribLocation(program, "position");
    var loc_value = gl.getAttribLocation(program, "value"); // let loc_color = gl.getAttribLocation(program, "color");
    // For 2D triangle meshes culling and depth testing is not needed.
    // gl.enable(gl.CULL_FACE);
    // gl.enable(gl.DEPTH_TEST);
    // Scissor defines the part of canvas to draw to.

    gl.enable(gl.SCISSOR_TEST);
    return {
      locations: {
        model: loc_model,
        view: loc_view,
        projection: loc_projection,
        colormap: loc_colormap,
        cmax: loc_cmax,
        cmin: loc_cmin,
        uint_cmax: loc_uint_cmax,
        uint_cmin: loc_uint_cmin,
        position: loc_position,
        value: loc_value
      },
      program: program
    };
  } // setupProgram

  // Padding can be clicked on, margin cannot. The click event is limited to the padding of the view object. A check is done on mousedown to make sure that interactions with the data don't trigger the div to move. When moving the item needs to be placed at the end of the rendering que, as well as the html order to ensure that it stays on top - so that other items don't draw over it, and that the dragging continues even when mousing over a div that was made after it.
  // The dragging is done outside because I wish the rest of the interactivity - spatial arrangement, grouping to be added on top of this. That should make those aspects more general.
  // The initial positions must be collected all at the same time, as otherwise the rest of the "position: relative;" divs will get repositioned to where the previous div was.
  // How to make the addition of dragging more general?? There are some things that have to happen. Pass them in as additional functions?
  function addDraggingToItem(item, onstart, ondrag, onend) {
    // Add an object to facilitate the dragging.
    item.dragging = {
      active: false,
      itemRelativePosition: [0, 0]
    }; // dragging

    item.node.onmousedown = function (e) {
      if (e.target == item.node || e.target == item.wrappednode) {
        var rect = item.node.getBoundingClientRect();
        item.dragging.active = true;
        item.dragging.itemRelativePosition = [e.clientX - rect.x, e.clientY - rect.y]; // Also move the viewFrame div up so that dragging over otehr higher divs is uninterrupted.

        item.node.parentNode.insertBefore(item.node, null);

        if (onstart) {
          onstart();
        } // if

      } // if

    }; // onmousedown


    item.node.onmousemove = function (e) {
      if (item.dragging.active) {
        var x = e.pageX - item.dragging.itemRelativePosition[0];
        var y = e.pageY - item.dragging.itemRelativePosition[1];
        item.node.style.left = x + "px";
        item.node.style.top = y + "px";

        if (ondrag) {
          ondrag();
        }
      } // if

    }; // mousemove


    item.node.onmouseup = function () {
      item.dragging.active = false;

      if (onend) {
        onend();
      }
    }; // onmouseup

  } // addDraggingToItem

  function svg2element$1(svg) {
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.innerHTML = svg.trim();
    return g.firstChild;
  } // svg2element
  // From regular helpers.

  function arrayEqual(A, B) {
    return arrayIncludesAll(A, B) && arrayIncludesAll(B, A);
  } // arrayEqual

  function arrayIncludesAll(A, B) {
    // 'arrayIncludesAll' checks if array A includes all elements of array B. The elements of the arrays are expected to be strings.
    // Return element of B if it is not contained in A. If the response array has length 0 then A includes all elements of B, and 'true' is returned.
    var f = B.filter(function (b) {
      return !A.includes(b);
    });
    return f.length == 0 ? true : false;
  } // arrayIncludesAll

  var scaleCategorical = /*#__PURE__*/function () {
    function scaleCategorical() {
      _classCallCheck(this, scaleCategorical);

      this.domain = [];
      this.range = ['#1f77b4', '#ff7f0e', '#2ca02c', '#d62728', '#9467bd', '#8c564b', '#e377c2', '#7f7f7f', '#bcbd22', '#17becf'];
    }

    _createClass(scaleCategorical, [{
      key: "dom2range",
      value: // Opposite function is not defined - two domain values can map to the same range value.
      function dom2range(v) {
        var obj = this;
        var i = (obj.domain.indexOf(v) + 1) % obj.range.length - 1;

        if (i < 0) {
          obj.domain.push(v);
          return obj.range[obj.domain.length - 1];
        } else {
          return obj.range[i];
        } // if

      } // dom2range

    }]);

    return scaleCategorical;
  }(); // scaleCategorical

  var DrawLink = /*#__PURE__*/function () {
    // Indices when exiting parent node, entering child node, and the index of position of the bend.
    // Actual dimensions. The label width is the minimum horizontal line length. Bundle width is the space reserved for the vertical line width. Line width is the actual width of the white outline. The default radius is the basis for the actual bend radii.
    function DrawLink(parentnode, childnode, author) {
      _classCallCheck(this, DrawLink);

      this.pi = 0;
      this.ci = 0;
      this.bendi = 0;
      this.node_label_width = 70;
      this.bundle_width = 4;
      this.line_width = 4;
      this.r = 16;
      var obj = this; // So that hte locations can be changed on hte go.

      obj.parentnode = parentnode;
      obj.childnode = childnode;
      obj.author = author; // Exit radius is determined node level difference.

      obj.r1 = (childnode.level - parentnode.level) * obj.r;
      obj.r2 = obj.r;
    } // constructor


    _createClass(DrawLink, [{
      key: "path",
      get: function get() {
        // Doesn't take into account the offsets yet!!
        // Allow this to return a straight path, or a curved one. The straight path is exclusively for bundles that have only one parent. Furthermore, that one should only be allowed when connecting nodes on the same height. So maybe just base the decision off of that?
        // Straight path is just M0 0 L40 0 or so.
        var obj = this;
        var dyc = obj.ci * obj.line_width + obj.childnode.markerEmptyIn;
        var dyp = obj.pi * obj.line_width + obj.parentnode.markerEmptyOut; // The target x should be > `xHorizontal + r1 + r2'

        var xHorizontal = obj.parentnode.x + obj.node_label_width + obj.bendi * obj.bundle_width; // Origin and target MUST be at least `[node_label_width + 2*r, 2*r]' apart otherwise the graphic logic doesn't follow.

        var origin = {
          x: obj.parentnode.x,
          y: obj.parentnode.yMarkerStart + dyp
        };
        var target = {
          x: obj.childnode.x,
          y: obj.childnode.yMarkerStart + dyc
        };
        var arc1start = {
          x: xHorizontal - obj.r1,
          y: origin.y
        };
        var arc1end = {
          x: xHorizontal,
          y: origin.y + obj.r1
        };
        var arc2start = {
          x: xHorizontal,
          y: target.y - obj.r2
        };
        var arc2end = {
          x: xHorizontal + obj.r2,
          y: target.y
        };
        /*
        How the path is made up.
        start point                   : M0 0
        horizontal line               : L40 0
        first bend to vertical        : A16 16 90 0 1 46 16
        vertical line                 : L46 34
        second bend to horizontal     : A16 16 90 0 0 62 50
        horizontal connection to node : L62 50
        */

        var p = "M".concat(origin.x, " ").concat(origin.y, " L").concat(arc1start.x, " ").concat(arc1start.y, " A").concat(obj.r1, " ").concat(obj.r1, " 90 0 1 ").concat(arc1end.x, " ").concat(arc1end.y, " L").concat(arc2start.x, " ").concat(arc2start.y, " A").concat(obj.r2, " ").concat(obj.r2, " 90 0 0 ").concat(arc2end.x, " ").concat(arc2end.y, " L").concat(target.x, " ").concat(target.y);
        return p;
      } // path

    }]);

    return DrawLink;
  }(); // DrawLink

  var template$4 = "\n<g class=\"bundle\">\n  <path stroke=\"white\" stroke-width=\"5\" fill=\"none\"></path>\n  <path stroke=\"black\" stroke-width=\"2\" fill=\"none\"></path>\n</g>\n"; // tempalte
  // These should just be exposed at the link level... The tree level also has them, and it's non hygienic.

  var node_label_width$1 = 70;
  var bundle_width$1 = 4;
  var r$1 = 16; // Bundles are the connections between two levels of nodes.

  var treebundle = /*#__PURE__*/function () {
    // Index is the ranked position of this bundle within hte level. It determines the position of hte vertical line segment, and the corner radius.
    function treebundle(seednode, author) {
      _classCallCheck(this, treebundle);

      this.links = [];
      this._bendi = 0; // A seed node is passed in to define the bundle parents and thus instantiate a bundle. After instantialisation only the children of the bundle can change.
      // NOTE: seednode is a `treenode' instance, but parents and children are `taskgroup' instances. The level is only defined for the node because it can change when the user interacts with the tree.

      var obj = this;
      obj.node = svg2element$1(template$4);
      obj.author = author, obj.level = seednode.level;
      obj.parents = seednode.connections.parents;
      obj.children = [seednode.connections.group];
      obj.nodeChildren = [seednode];
      obj.nodeParents = [];
    } // constructor


    _createClass(treebundle, [{
      key: "bendi",
      get: // bendi
      function get() {
        return this._bendi;
      } // get bendi
      ,
      set: function set(i) {
        // When a bunldes bend index is set it should propagate it to all the children.
        var obj = this;
        obj.links.forEach(function (link) {
          link.bendi = i;
        }); // forEach

        obj._bendi = i;
      }
    }, {
      key: "update",
      value: function update(color) {
        var obj = this;
        var paths = obj.node.querySelectorAll("path");

        for (var i = 0; i < paths.length; i++) {
          paths[i].setAttribute("d", obj.path);
        } // for


        if (color) {
          paths[paths.length - 1].setAttribute("stroke", color);
        } // if

      } // update

    }, {
      key: "addparent",
      value: function addparent(node) {
        // Only nodes can be pushed. And only the ones declared upon initialisation!
        var obj = this;
        var isNodeAllowed = obj.parents.includes(node.connections.group);
        var isNodeUnknown = !obj.nodeParents.includes(node);

        if (isNodeAllowed && isNodeUnknown) {
          obj.nodeParents.push(node);
          obj.updateNodeMinPositions();
        } // if

      } // addparent

    }, {
      key: "addchild",
      value: function addchild(node) {
        var obj = this;

        if (!obj.children.includes(node.connections.group)) {
          obj.children.push(node.connections.group);
        } // if


        if (!obj.nodeChildren.includes(node)) {
          obj.nodeChildren.push(node);
          obj.updateNodeMinPositions();
        } // if

      } // addchild

    }, {
      key: "makelinks",
      value: function makelinks() {
        var obj = this; // Links must be made for every child-parent combination. Strictly speaking at least one link must be made for all the children, and at least one link must connect to every parent.

        var links = [];
        obj.nodeParents.forEach(function (p) {
          obj.nodeChildren.forEach(function (c) {
            links.push(new DrawLink(p, c));
          }); // forEach
        }); // forEach

        obj.links = links;
      } // links
      // Make the full path here??

    }, {
      key: "path",
      get: function get() {
        var obj = this;
        return obj.links.map(function (link) {
          return link.path;
        }).join("");
      } // path

    }, {
      key: "width",
      get: function get() {
        // The width of the bundle is the fixed horizontal distance plus the number of bundles multiplied by the width reserved for the vertical line segment. The nodes, and therefore the lines are not yet positioned properly, therefore their width cannot be used to calculate the bunlde width. But they can be just summed together though!
        // Note that this is the minimum width of spanning one level, and not the entire width of the bundle, which may include lines spanning multiple levels!
        return node_label_width$1 + obj.bundles.length * bundle_width$1 + r$1;
      } // get width

    }, {
      key: "updateNodeMinPositions",
      value: function updateNodeMinPositions() {
        // This should just be run whenever teh parents or the children are changed.
        // Because the links make two 90 degree turns when connecting the parent to the child the radii of these turns constitute the minimum y offset of this bundle relative to the previous one. Furthermore, this is offset relative to the lowest parent! This is important when positioning the child nodes.
        var obj = this;
        var y_lowest_parent = obj.nodeParents.reduce(function (acc, p) {
          return acc > p.y ? acc : p.y;
        }, 0);
        obj.nodeChildren.forEach(function (child) {
          child.miny = y_lowest_parent + 2 * r$1;
        }); // forEach
      } // y_min

    }]);

    return treebundle;
  }(); // treebundle

  var node_label_width = 70; // length of text

  var bundle_width = 4; // reserved space for the vertical bunlde line

  var r = 16; // arc radius
  // A level is an organisational group. All dimensioning is done through a treelevel. The primary elements that define the level are its bundles. The TreeLevel is necessary because the bundles need to be sequenced within a level, and the level width is required to position hte levels. Because the bundles are based on a set of parents, the level of the bundle is the level of the children.

  var TreeLevel = /*#__PURE__*/function () {
    function TreeLevel(nodes, bundles, nlevel) {
      _classCallCheck(this, TreeLevel);

      var obj = this;
      obj.n = nlevel;
      obj.bundles = bundles.filter(function (b) {
        return b.level == nlevel;
      });
      obj.nodes = nodes.filter(function (n) {
        return n.level == nlevel;
      });
    } // constructor


    _createClass(TreeLevel, [{
      key: "width",
      get: function get() {
        // The width of the entire level. It's the width of the label plus the width of all the vertical line segments (including padding), plus the length of the finishing horizontal segment (this is zero for the right-most bundle).
        var obj = this; // The width of the level is determined by the bundles that end in it. If there aren't any bundles, there is no width. Maybe do a reduce and move the width calculation to the bundle? That would eliminate the dimensions here.

        if (obj.bundles.length > 0) {
          return node_label_width + obj.bundles.length * bundle_width + r;
        } else {
          return 0;
        } // if

      } // width

    }]);

    return TreeLevel;
  }(); // TreeLevel

  /* 
  A defined group hierarchy (groups, group members, and group parents have been established) is passed in. The input data is an array of groups to be drawn.

  This is the background data based on which a tree chart can be established. Interactions with the tree don't change the underlying group hierarchy, only the drawn representation.
  */

  /*
  Node height -> number of bundles connecting to it
  Node x -> depends on the levels and their widths
  Node y -> position of parent nodes
  Level width -> number of bundles
  Bundle links -> parent/child nodes
  */

  function getBundleLinesGoingThroughNode(bundle, node) {
    // Given some bundles find which of its lines go through a specific node. Whether the lines are incoming or outgoing is not needed, because it's determined by the relationship between the bundles and the node. Instead the node must just be referenced by the line.
    return bundle.links.filter(function (link) {
      return link.childnode == node || link.parentnode == node;
    }); // filter
  } // getBundleLines


  function arrangeIncomingOutgoingTracks(node, bundles) {
    // To draw the node I need to know where to start, how big it should be, and I should also know what the label is, and what the corresponding tags are.
    // Each bundle should be staggered when entering a particular node. But bundles can also hold lines of several authors. These should be staggered as well.
    var outgoingbundles = bundles.filter(function (b) {
      return b.parents.includes(node.connections.group);
    }); // filter

    var incomingbundles = bundles.filter(function (b) {
      return b.children.includes(node.connections.group);
    }); // filter
    // Bundles spanning multiple levels should be all the way at the top. Then they should be ordered by bundle ind. Larger bendi means bend happens more to the right.

    incomingbundles.sort(function (a, b) {
      return b.level - a.level || b.bendi - a.bendi;
    }); // sort

    outgoingbundles.sort(function (a, b) {
      return b.level - a.level || b.bendi - a.bendi;
    }); // sort
    // This should be improved. First of all, the track indices and the bundle indices should be coordinated by sorting the lines by bundle ind before assigning the track ind. Secondly, it would be good if bundles of the same color could maintain same track positions...
    // Assign the index of track to enter the node by.

    incomingbundles.forEach(function (bundle, i) {
      var lines = getBundleLinesGoingThroughNode(bundle, node);
      lines.forEach(function (line) {
        line.ci = i;
      });
    }); // forEach

    outgoingbundles.forEach(function (bundle, i) {
      var lines = getBundleLinesGoingThroughNode(bundle, node);
      lines.forEach(function (line) {
        line.pi = i;
      });
    }); // forEach
    // Set number of incoming bundles.

    node.nbundlesin = incomingbundles.length;
    node.nbundlesout = outgoingbundles.length;
  } // arrangeIncomingOutgoingTracks


  function arrangeBundlesOfLevel(bundles) {
    bundles.sort(function (a, b) {
      // How to sort by similarity? Similarity is based on a pairs, not on individual. Maybe order by size, and then progressively do smaller sorts? Or just sort the nodes, and adjust the bundles to that?
      // Sort by size.
      return b.children.length - a.children.length;
    }); // sort
    // But it also depends on hte nodes in hte previous level? So just arrange them sensibly? Go through them and assign minimum y positions based on the parents. This can later be used to create further bundles?
    // Maybe the nodes should just track the indices of the paths that lead to them? Sort of a history? That would also allow the longest chain to be identified. And then the level indices of the paths/bundles can be used to determine the order.
    // Maybe if the up-path is also allowed it can be used to reclaim some space after a particular branch ends?
    // The bundle needs an ind for within the level. This can be used to sort the bundle links horizontally. The location of the vertical line segment is determined based on this index.

    var maxBundleInd = bundles.length - 1;
    bundles.forEach(function (b, i) {
      b.bendi = maxBundleInd - i;
    }); // forEach
  } // arrangeBundlesOfLevel


  function getbundles(nodes) {
    // The bundles should be differentiated based on tag authors.
    var bundleseeds = nodes.filter(function (node) {
      return node.connections.parents.length > 0;
    }); // filter
    // The `taskgroup' objects have several tags connected to them. Each tag represents a group that was created by some user. For every author of a group there should be a different bundle connecting to it. Even if the tag has only been created for that specific group.
    // Two bundles are not necessarily the same if htey have the same parents. They should be differentiated by the user tag also.

    var bundles = bundleseeds.reduce(function (bundles, node) {
      // This node may belong to several bundles made by different authors. Find thos bundles, and if they can't be found create them.
      node.connections.group.tags.forEach(function (tag) {
        var existing = bundles.filter(function (b) {
          return b.author == tag.author;
        }).filter(function (b) {
          return arrayEqual(b.parents, node.connections.parents);
        });

        if (existing.length > 0) {
          existing.forEach(function (b) {
            b.addchild(node);
          }); // forEach
        } else {
          bundles.push(new treebundle(node, tag.author));
        } // if

      });
      return bundles;
    }, []); // map
    // Go through hte nodes one more time to assign the parent nodes also. Originally only the groups are assigned as parents as the incoming nodes don't reference other nodes, but the groups do reference each other.
    // `treebundle' instances will check whether parents are valid.

    nodes.forEach(function (node) {
      bundles.forEach(function (bundle) {
        bundle.addparent(node);
      });
    }); // forEach
    // Make sure the bundles create all the required links.

    bundles.forEach(function (bundle) {
      bundle.makelinks();
    });
    return bundles;
  } // get bundles


  function getlevels(nodes, bundles) {
    // Always create all new levels!!
    var levels = []; // Find all the levels from the bundles.

    var maxlevel = Math.max.apply(Math, _toConsumableArray(nodes.map(function (n) {
      return n.level;
    })));

    for (var level = 0; level < maxlevel + 1; level++) {
      levels.push(new TreeLevel(nodes, bundles, level));
    } // for


    return levels;
  } // get levels
  // Maybe devolve this one into TreeRender and hierarchy?
  // The user can only click on the nodes to directly interact with the tree. Currently the 'collapsenode' is used for that.


  function dimensioning(nodes) {
    // `dimension' calculates the positions of the nodes on the screen, and dimensions the connecting links.
    nodes.forEach(function (node) {
      return node.clear();
    }); // Need to get teh levels so that I have a constant copy... mobx would probably improve this, but it'll do for now. Maybe it'd just be better to collect this with some sort of functions? And not getters?

    var bundles = getbundles(nodes);
    var levels = getlevels(nodes, bundles); // First order the bundles within hte levels.

    levels.forEach(function (level) {
      return arrangeBundlesOfLevel(level.bundles);
    }); // forEach
    // ASSIGN INCOMING/OUTGOING INDICES TO LINES.

    nodes.forEach(function (node) {
      return arrangeIncomingOutgoingTracks(node, bundles);
    }); // forEach
    // Last thing is to position the nodes.

    var x_offset = 0;
    levels.forEach(function (level) {
      // Recalculate the minimum node positions.
      level.bundles.forEach(function (b) {
        return b.updateNodeMinPositions();
      }); // Now sort the nodes by their miny to conserve as much space as possible.

      level.nodes.sort(function (a, b) {
        return a.miny - b.miny;
      }); // sort
      // With the sizes of the nodes defined, the x and y locations can be assigned. The x location depends on the level, and the y location on the order within hte level.

      x_offset += level.width;
      var y_offset = 0;
      level.nodes.forEach(function (n) {
        n.x = x_offset;
        n.y = y_offset; // Compute offset for next node. This is just offset within the level!

        y_offset = n.y + n.markersize + n.pitch;
      }); // forEach
    }); // forEach

    return {
      nodes: nodes,
      bundles: bundles
    };
  } // dimensioning

  // text -> 	"x", node => node.labelx, "y", node => node.labely, label node=>node.label

  var template$3 = "\n<g class=\"node\" cursor=\"pointer\">\n  <g class=\"marker\">\n    <path class=\"outline\" stroke=\"black\" stroke-width=\"8\" stroke-linecap=\"round\"></path>\n    <path class=\"fill\" stroke=\"white\" stroke-width=\"4\" stroke-linecap=\"round\"></path>\n  </g>\n  <g class=\"label\">\n    <text class=\"unselectable\" stroke=\"white\" stroke-width=\"2\" font-size=\"10px\"></text>\n    <text class=\"unselectable\" stroke=\"black\" stroke-width=\"0.5\" font-size=\"10px\"></text>\n  </g>\n</g>\n"; // template
  // A treenode object is a higher level wrapper that contains all the dimensioning information. The `connections' attribute is supposed to hold the `treegroup' object, which contains a reference the an individual group, all it's ancestors, it's direct parents, and all its descendants.

  var TreeNode = /*#__PURE__*/function () {
    // Line width is the width of the incoming line. The pitch is the vertical spacing to the next node.
    function TreeNode(treegroup) {
      _classCallCheck(this, TreeNode);

      this.x = undefined;
      this._y = 0;
      this.miny = 0;
      this.line_width = 4;
      this.pitch = 32;
      this.nbundlesin = 0;
      this.nbundlesout = 0;
      this.hidden = false;
      var obj = this;
      obj.node = svg2element$1(template$3); // The treegroup holds all the connections of a particular group.

      obj.connections = treegroup;
      var label = obj.node.querySelector("g.label");

      label.onmouseenter = function () {
        obj.highlighttext(true);
      };

      label.onmouseleave = function () {
        obj.highlighttext(false);
      };

      var marker = obj.node.querySelector("g.marker");

      marker.onmouseenter = function () {
        obj.highlightmarker(true);
      };

      marker.onmouseleave = function () {
        obj.highlightmarker(false);
      };
    } // constructor	


    _createClass(TreeNode, [{
      key: "update",
      value: function update() {
        var obj = this;
        var marker = obj.node.querySelector("g.marker");
        var paths = marker.querySelectorAll("path");
        var label = obj.node.querySelector("g.label");
        var texts = label.querySelectorAll("text");

        for (var i = 0; i < paths.length; i++) {
          paths[i].setAttribute("d", "M".concat(obj.x, " ").concat(obj.yMarkerStart, " L").concat(obj.x, " ").concat(obj.yMarkerStart + obj.markersize));
        } // for


        label.setAttribute("transform", "translate(".concat(obj.labelx, ", ").concat(obj.labely, ")"));

        for (var _i = 0; _i < texts.length; _i++) {
          texts[_i].innerHTML = obj.label;
        } // for

      } // update

    }, {
      key: "highlighttext",
      value: function highlighttext(v) {
        var obj = this;
        var size = v ? "12px" : "10px";
        var texts = obj.node.querySelector("g.label").querySelectorAll("text");

        for (var i = 0; i < texts.length; i++) {
          texts[i].setAttribute("font-size", size);
        } // for

      } // highlighttext

    }, {
      key: "highlightmarker",
      value: function highlightmarker(v) {
        var obj = this;
        var size = v ? 10 : 8;
        var outline = obj.node.querySelector("g.marker").querySelector("path.outline");
        outline.setAttribute("stroke-width", size);
      } // highlighttext

    }, {
      key: "clear",
      value: function clear() {
        var obj = this;
        obj.x = undefined;
        obj._y = 0;
        obj.miny = 0;
        obj.nbundlesin = 0;
        obj.nbundlesout = 0;
      } // clear

    }, {
      key: "y",
      get: // set y
      function get() {
        var obj = this;
        return Math.max(obj._y, obj.miny);
      } // get y
      ,
      set: function set(val) {
        var obj = this;
        obj._y = val;
      }
    }, {
      key: "yMarkerStart",
      get: function get() {
        var obj = this;
        var yoffset = obj.markersize > 0 ? obj.line_width / 2 : 0;
        return obj.y - obj.markersize / 2 + yoffset;
      } // markery

    }, {
      key: "markersize",
      get: function get() {
        return Math.max(this.nbundlesin - 1, this.nbundlesout - 1, 0) * this.line_width;
      } // markersize

    }, {
      key: "markerEmptyIn",
      get: function get() {
        // If the marker is larger than the width of the lines coming in, then the lines should be centered in hte middle of the marker. Calculate the empty space from hte marker start to where the lines should begin.
        var obj = this;
        return (obj.markersize - (obj.nbundlesin - 1) * obj.line_width) / 2;
      } // markerEmptyIn

    }, {
      key: "markerEmptyOut",
      get: function get() {
        var obj = this;
        return (obj.markersize - (obj.nbundlesout - 1) * obj.line_width) / 2;
      } // markerEmptyIn
      // Label to be displayed next to it. Shouldn't be larger than the node_label_width.

    }, {
      key: "label",
      get: function get() {
        var obj = this;
        var name = obj.connections.group.tags.length > 0 ? obj.connections.group.tags[0].label : "Root"; // Temporarily changed to show n tasks for troubleshooting.
        // let n = obj.connections.descendants.length;

        var n = obj.connections.group.members.length;
        return "".concat(name, " ").concat(n > 0 ? "(".concat(n, ")") : "");
      } // label

    }, {
      key: "labelx",
      get: function get() {
        return this.x + 4;
      } // labelx

    }, {
      key: "labely",
      get: function get() {
        return this.yMarkerStart - 4;
      } // labely

    }]);

    return TreeNode;
  }(); // TreeNode

  /*
  If all the tasks are in the same array, and the author information is on the tags, then the partial trees won;t be a problem.

  Every tag represents a group possibility essentially. But the same tag can relate to different groups. The group members differentiate the groups. The different tag descriptions of the groups should all be presented on mouseover, maybe along with the author data.

  Won't be able to remove the initial dialogue in the small multiples visualisation, but I will be able to get rid of the expand button on the small multiples.
  */
  // FROM AN ARRAY OF TASKS WITH TAGS TO A TREE

  function array2tree(array) {
    /*
    1.) Find groups.
    2.) Merge them.
    3.) Create parent-child relationships
    */
    // Find all created groups, and merge the ones with identical members.
    var groups = findAllTagBasedGroups(array);
    var mergedgroups = mergeIdenticalGroups(groups); // Convert the groups into a higher level object to avoid circular references when figuring out ancestry.

    var hierarchicalnodes = findParentalRelationships(mergedgroups);
    return hierarchicalnodes;
  } // array2tree
  // The tree node represents a single group, but also holds references to the parent and child nodes. The treenode is a higher level object to avoid circular referencing of objects.

  var treegroup = function treegroup(taskgroup) {
    _classCallCheck(this, treegroup);

    var obj = this;
    obj.group = taskgroup; // Groups CAN have more than 1 parent. While it's true that during a single dive through the tasks each group can only have one parent, it's possible that additional dives (by the same, or other users) will produce the same groups, but tracing different steps. The merging already combines all identical groups, so the merged groups can have multiple parents.
    // Select the parents as all those candidate  groups that have not been referenced by other candidate groups already.

    obj.ancestors = []; // All upstream groups

    obj.parents = []; // Only groups directly above this one.

    obj.descendants = []; // All downstream groups

    obj.children = undefined; // Only groups directly below. Is this needed??
  } // constructor
  ; // treegroup


  var taskgroup = /*#__PURE__*/function () {
    function taskgroup() {
      _classCallCheck(this, taskgroup);

      this.tags = [];
      this.members = [];
    } // constructor


    _createClass(taskgroup, [{
      key: "addtask",
      value: function addtask(task) {
        var obj = this;

        if (!obj.members.includes(task)) {
          obj.members.push(task);
        } // if

      } // addtask

    }, {
      key: "addtag",
      value: function addtag(tag) {
        var obj = this;

        if (!obj.tags.some(function (existing) {
          return existing.id == tag.id;
        })) {
          obj.tags.push(tag);
        } // if

      } // addtags

    }]);

    return taskgroup;
  }(); // group
  // Making groups.


  function findAllTagBasedGroups(array) {
    // Create a group for each tag present in the array. We also need to differentiate teh groups by the author at this point. Otherwise parallel trees won't be possible.
    var dict = {};
    var groups = [];
    array.forEach(function (tag) {
      // If you tag something in the session, then that tag is reserved for a particular group. If you tag other elements with it, it'll become a part of that group. Actual tags need to be retained in order to be able to edit them, and therefore edit the groups.
      var groupid = [tag.label, tag.author].join("-");

      if (!dict[groupid]) {
        // Here just pass the tag in. The group will need to hold on to it.
        dict[groupid] = new taskgroup();
        groups.push(dict[groupid]);
      } // if
      // Add teh task to the specific group, but also to the root group.


      dict[groupid].addtask(tag.taskId);
      dict[groupid].addtag(tag);
    }); // forEach
    // A root group should be present. It will be merged with other existing groups if possible in hte next tep.

    var root = makeRootGroup(array);
    return groups.concat(root);
  } // findAllTagBasedGroups


  function makeRootGroup(array) {
    // The root MUST always contain all of the data!! It will also allow navigation all the way to the start.
    var root = new taskgroup([{
      id: "Root",
      label: "Root",
      author: "session",
      timestamp: new Date()
    }]); // Root should contain all tasks.

    array.forEach(function (tag) {
      root.addtask(tag.taskId);
    }); // forEach

    return root;
  } // makeRootGroup


  function mergeIdenticalGroups(groups) {
    var mergedgroups = groups.reduce(function (acc, g) {
      // Find group with identical members.
      var identicalg = acc.filter(function (g_) {
        return arrayEqual(g_.members, g.members);
      }); // filter

      if (identicalg.length > 0) {
        // Add another author to existing group.
        g.tags.forEach(function (tag) {
          identicalg[0].addtag(tag);
        });
      } else {
        // Add this group to the unique ones.
        acc = acc.concat(g);
      } // if


      return acc;
    }, []); // reduce

    return mergedgroups;
  } // mergeIdenticalGroups


  function isSubset(a, b) {
    // Check whether array a is a subset of array b.
    // A must be strictly smaller than b.
    if (a.length < b.length) {
      // Check if b contains all of a.
      return arrayIncludesAll(b, a);
    } else {
      return false;
    } // if

  } // isSubset


  function findParentalRelationships(groups) {
    // First create an object one level above to avoid cross referenceing of objects.
    var nodes = groups.map(function (g) {
      return new treegroup(g);
    }); // maybe calculate all ancestors, all descendants, and then parents and children? Could be useful to have all hte information available.
    // FIND PARENT CANDIDATES FOR ALL GROUPS.

    nodes.forEach(function (node) {
      // Ancestor groups are all groups that include all of the members of the node group, but are larger than it.
      node.ancestors = groups.filter(function (g) {
        return isSubset(node.group.members, g.members);
      }); // filter
      // Descendant groups are all groups that contain a subset of the members of this group.

      node.descendants = groups.filter(function (g) {
        return isSubset(g.members, node.group.members);
      });
    }); // forEach
    // Groups CAN have more than 1 parent. While it's true that during a single dive through the tasks each group can only have one parent, it's possible that additional dives (by the same, or other users) will produce the same groups, but tracing different steps. The merging already combines all identical groups, so the merged groups can have multiple parents.
    // Select the parents as all those candidate  groups that have not been referenced by other candidate groups already.
    // Loop over all the candidates of a particular group, and remove all candidates that appear in that.

    nodes.forEach(function (node) {
      node.parents = node.ancestors; // All parents of a candidate parent are considered `grandparents'. All grandparents cannot be the parent. Loop over the candidates and remove all grandparents. Candidates also include teh candidates parents, so the whole lineage is checked.

      node.parents.forEach(function (candidate) {
        // The candidate now no longer has parents. Just check directly? If another group contains all the members of a group then it is its parent.
        node.parents = node.parents.filter(function (parent) {
          if (candidate == parent) {
            // A candidate can't eliminate himself.
            return true;
          } else {
            return !isSubset(candidate.members, parent.members);
          } // if

        }); // filter
      }); // forEach
    }); // forEach

    return nodes;
  } // findParentalRelationships


  function calculateLevelNumbers(nodes) {
    // First clear all the levels and set any root ones.
    nodes.forEach(function (node) {
      node.level = undefined;

      if (node.connections.parents.length == 0) {
        node.level = 0;
      } // if

    }); // Now move through the nodes and check if all parents already had a level assigned. If so the level of the node is max(parents.level) + 1. This must be done until all the nodes have an assigned level.

    for (var i = 0; i < nodes.length; i++) {
      var unassignednodes = nodes.filter(function (node) {
        return node.level == undefined;
      });
      unassignednodes.forEach(function (node) {
        // All parents must have an assigned level, otherwise skip. Check if any don't have level.
        var parents = node.connections.parents.reduce(function (acc, parent) {
          return acc.concat(nodes.filter(function (node) {
            return node.connections.group == parent;
          }));
        }, []); // reduce

        if (parents.some(function (parent) {
          return parent.level == undefined;
        })) ; else {
          node.level = Math.max.apply(Math, _toConsumableArray(parents.map(function (parent) {
            return parent.level;
          }))) + 1;
        } // if

      }); // forEach

      if (unassignednodes.length == 0) {
        break;
      } // if

    } // for

  } // calculateLevelNumbers

  var TreeHierarchy = /*#__PURE__*/function () {
    function TreeHierarchy() {
      _classCallCheck(this, TreeHierarchy);

      var obj = this;
      obj.data = [];
      obj.collapsednodes = [];
      obj.update();
    } // constructor


    _createClass(TreeHierarchy, [{
      key: "update",
      value: function update() {
        // Recalculate makes new treenodes. Maybe instead of having hidden nodes just have hidden tasks? And any group that consists only of the hidden tasks is hidden also? That's how the hierarchy creation works anyway.
        // Nah, just push the togglig to the node itself! However, anytime that the data will be recalculated the hidden aspect will disappear....
        var obj = this;
        obj.nodes = array2tree(obj.data).map(function (group) {
          return new TreeNode(group);
        }); // map
      } // update

    }, {
      key: "visiblenodes",
      get: function get() {
        var obj = this;
        var collapsednodes = obj.nodes.filter(function (node) {
          return node.hidden;
        }); // Based on the collapsed nodes determine which ones are still visible. I can ignore any incorrect nodes here. But I would rather just get rid of them.

        var hiddennodes = obj.nodes.filter(function (node) {
          return collapsednodes.some(function (collapsed) {
            return collapsed.connections.descendants.includes(node.connections.group);
          }); // some
        }); // filter
        // Filter out any disabled nodes. Maybe this can be made more sophisticated so that the folds further down the line are preserved?

        var nodes = obj.nodes.filter(function (node) {
          return !hiddennodes.includes(node);
        }); // The level numbers should be assigned to all active nodes.

        calculateLevelNumbers(nodes);
        return nodes;
      } // get nodes

    }]);

    return TreeHierarchy;
  }(); // TreeHierarchy

  /* TODO
  - Connect to a scatter plot for interactive tag addition.
  - Handle unassigned tasks.
  */

  /* ADVANCED
  - Single parent bundles should allow for straight links too.

  - How to display very large trees?
  	Make the tree zoomable?

  - How should the group descriptions be presented? 
  	Number of tasks, number of children, text description, AUTHOR!! All the data is available. Maybe on text hover all the information should be displayed?? Maybe in a tooltip?
  - Which label to select when making nodes?
  	The current author should be allowed to control their branch. This would require some differentiation between users. Certainly can't be done now. For now just select the first one?
  - How to merge the groups interactively? I.e. a git pull.
  */

  /* DONE
  - Collapsible nodes - collapse, with the folding history saved.
  - Enforce partial branches to be inserted - tree created on bundle level.
  - Make text unselectable - add into app css
  - Fix node mouseover css - css affects specific child of mover g.
  */

  var template$2 = "\n<g transform=\"translate(20, 20)\">\n  <g class=\"bundles\"></g>\n  <g class=\"nodes\"></g>\n  <g class=\"nodetooltip\"></g>\n  <g class=\"linktooltip\"></g>\n</g>\n";

  var TreeRender = /*#__PURE__*/function () {
    function TreeRender() {
      _classCallCheck(this, TreeRender);

      var obj = this; // Hierarchy

      obj.hierarchy = new TreeHierarchy(); // Drawing

      obj.node = svg2element$1(template$2);
      obj.gnodes = obj.node.querySelector("g.nodes");
      obj.gbundles = obj.node.querySelector("g.bundles");
      obj.color = new scaleCategorical();
    } // constructor


    _createClass(TreeRender, [{
      key: "clear",
      value: function clear() {
        // When clearing by looping through .children and .remove() it only removed the nodes in the last step. When redrawing it added all of them back somehow...
        var obj = this;
        obj.gnodes.innerHTML = "";
        obj.gbundles.innerHTML = "";
      } // clear

    }, {
      key: "interact",
      value: function interact() {
        var obj = this;
        obj.clear();
        obj.map = dimensioning(obj.hierarchy.visiblenodes);
        obj.updatenodes();
        obj.updatelines();
      } // interact

    }, {
      key: "update",
      value: function update() {
        var obj = this;
        obj.hierarchy.update();
        obj.interact();
      } // update
      // The functionality is added in here. Maybe refactor to remove the nestedness??

    }, {
      key: "updatenodes",
      value: function updatenodes() {
        var obj = this;
        obj.map.nodes.forEach(function (nodeobj) {
          obj.gnodes.appendChild(nodeobj.node);
          nodeobj.update(); // Add teh styling changes on mouseover. Clicking the label moves view to the group.

          nodeobj.node.querySelector("g.label").onclick = function () {
            obj.moveto(nodeobj);
          }; // onclick
          // Clicking on hte node just collapses branches.


          nodeobj.node.querySelector("g.marker").onclick = function () {
            nodeobj.hidden = !nodeobj.hidden;
            obj.interact();
          }; // onclick

        }); // forEach
      } // updatenodes

    }, {
      key: "updatelines",
      value: function updatelines() {
        var obj = this; // The renderer controls the color of the lines!!

        obj.map.bundles.forEach(function (bundleobj) {
          obj.gbundles.appendChild(bundleobj.node);
          bundleobj.update(obj.color.dom2range(bundleobj.author));
        }); // forEach
      } // updatelines

    }, {
      key: "moveto",
      value: function moveto(nodeobj) {
        // I want to move to the group which contains only tasks given by "nodeobj.connections.group.members", but I also want to show all the groups within that grop.
        console.log("Move to", nodeobj.connections.group.members);
      } // moveto

    }]);

    return TreeRender;
  }(); // TreeRender

  function html2element(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim(); // Never return a text node of whitespace as the result

    return template.content.firstChild;
  } // html2element

  function svg2element(svg) {
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.innerHTML = svg.trim();
    return g.firstChild;
  } // svg2element

  var scaleLinear = /*#__PURE__*/function () {
    function scaleLinear() {
      _classCallCheck(this, scaleLinear);

      this._domain = [0, 1];
      this._range = [0, 1];
    }

    _createClass(scaleLinear, [{
      key: "domain",
      get: // domain
      function get() {
        return this._domain;
      } // domain
      ,
      set: function set(d) {
        this._domain = d;
      }
    }, {
      key: "range",
      get: // range
      function get() {
        return this._range;
      } // range
      ,
      set: function set(r) {
        this._range = r;
      }
    }, {
      key: "dom2range",
      value: function dom2range(v) {
        return mapSpaceAValueToSpaceB(v, this.domain, this.range);
      } // dom2range

    }, {
      key: "range2dom",
      value: function range2dom(v) {
        return mapSpaceAValueToSpaceB(v, this.range, this.domain);
      } // range2dom

    }]);

    return scaleLinear;
  }(); // scaleLinear

  function mapSpaceAValueToSpaceB(v, A, B) {
    return (v - A[0]) / (A[1] - A[0]) * (B[1] - B[0]) + B[0];
  } // mapSpaceAValueToSpaceB

  // The main difficulty with this is drawing the standard deviation plot. How would that look like in 3D anyway?

  var css = {
    view: "\n\twidth: 300px;\n\theight: 200px;\n  ",
    groupbutton: "\n\tborder: none;\n\tbackground-color: transparent;\n\tcolor: gainsboro; \n\tcursor: pointer;\n\tpadding: 2.3px;\n\tmargin-bottom: 10px;\n  ",
    bookmark: "\n    height: 20px; \n\twidth: 20px; \n\tbackground-color: gainsboro;\n  "
  }; // css
  // The div.item is the top element when the user clicks to drag. The dragging checks whether drag is the appropriate action (as opposed to view interactions) by checking if the event target equals the item node. For the group that is not so because it has an additional wrapper.

  var template$1 = "\n<div class=\"item-group\" style=\"position: absolute;\">\n  <table style=\"border-collapse: collapse;\">\n    <tbody>\n\t<tr>\n\t  <td>\n\t\t<div class=\"item-proxy\" style=\"box-shadow: 1px 2px 4px 0px rgba(0,0,0,0.25);\">\n\t\t  <div class=\"label\">Group</div>\n\t\t  <div class=\"view-proxy\"></div>\n\t\t  <div class=\"playcontrols-proxy\"></div>\n\t\t  <div class=\"chapterform-proxy\"></div>\n\t\t  <div class=\"commenting\"></div>\n\t\t</div>\n\t  </td>\n\t  <td style=\"vertical-align: top;\">\n\t    <button class=\"ungroup\" style=\"".concat(css.groupbutton, "\">\n\t\t  <i class=\"fa fa-times\" style=\"font-size: 20px;\"></i>\n\t\t</button>\n\t\t<button class=\"dissolve\" style=\"").concat(css.groupbutton, " display:none;\">\n\t\t  <i class=\"fa fa-trash-o\" style=\"font-size: 20px;\"></i>\n\t\t</button>\n\t\t<div class=\"bookmarks\">\n\t\t</div>\n\t  </td>\n\t</tr>\n\t</tbody>\n  </table>\n</div>\n"); // template
  // Maybe this should be just an empty div over the item, and then that item should be shown? And other ones can just be hidden?? Maybe that is simplst - no moving of the controls needed at all. But commenting? How should that work? Just change the commenting?

  var bookmarktemplate = "<div class=\"mark\" style=\"".concat(css.bookmark, "\"></div>");
  /*
  BUTTON NEEDS TO BE REINTRODUCED!!

  If the group were to be a separate ViewFrame subclass, then the grouping cannot just be tagged on.
  If the group is just an empty div that covers the currently shown item, then the interactions are blockd. 
  */
  // When made it should have a series of squares, which when moused over will move between the individual items. Where should these controls be placed though? How should the title be made visible?
  // Maybe controls should be above, and the name should change? Then the comments can always be below. Should there be a comment section for all of them at once? I guess so, so that they can all be characterised together.
  // Ok, comment sections can be turned off - only the playbar is needed! It also needs a way to remove the group alltogether. A cross in the right top.
  // This needs to reorder the items in the rendering.items so that te moused over one is the one drawn on top. Fo that it needs access to that array.

  var Group = /*#__PURE__*/function () {
    function Group(drawingorder, members, tags) {
      _classCallCheck(this, Group);

      this.members = [];
      var obj = this;
      obj.node = html2element(template$1);
      obj.wrappednode = obj.node.querySelector("div.item-proxy");
      obj.wrappedview = obj.node.querySelector("div.view-proxy");
      obj.bookmarks = obj.node.querySelector("div.bookmarks");
      obj.node.querySelector("div.label").innerText = tags[0].label;
      obj.tags = tags; // Drawing order allows the group to changethe order in which the GPU renders the items.

      obj.drawingorder = drawingorder; // Calculate where the node should be added. Store the original positions on the items, as long as they are in the group.

      var n = members.length;
      var pos = members.reduce(function (acc, item) {
        acc[0] += parseInt(item.node.style.left) / n;
        acc[1] += parseInt(item.node.style.top) / n;
        return acc;
      }, [0, 0]);
      obj.node.style.left = pos[0] + "px";
      obj.node.style.top = pos[1] + "px"; // All the members should also be moved to this position. Turn off their uis, wih the exception of the playbar. Also remember their relative positions?

      members.forEach(function (item) {
        obj.add(item);
      }); // foEach

      obj.current = obj.members[0]; // pos needs to be made before calling .add, but .add creates initialposition which is needed for calculating pos.
      // Removal of the group.

      obj.node.querySelector("button.ungroup").onclick = function () {
        obj.remove();
      }; // onclick
      // Dissolving the annotations.


      obj.node.querySelector("button.dissolve").onclick = function () {
        obj.dissolve();
      }; // onclick
      // The view events should be passed down to the current item.


      obj.wrappedview.onmousedown = function (e) {
        obj.current.cameraMoveStart(e);
      };

      obj.wrappedview.onmousemove = function (e) {
        obj.current.cameraMove(e);
      };

      obj.wrappedview.onmouseup = function (e) {
        obj.current.cameraMoveEnd();
      };

      obj.wrappedview.onmouseleave = function (e) {
        obj.current.cameraMoveEnd();
      };

      obj.wrappedview.addEventListener("wheel", function (e) {
        e.preventDefault();
        obj.current.cameraZoom(e);
      }, {
        passive: false
      }); // Add ina commenting module. Which id should it use? Maybe the one of the current object?

      obj.commenting = new CommentingManager(obj.current.ui.commenting.viewid);
      obj.node.querySelector("div.commenting").appendChild(obj.commenting.node);
      obj.updateWrapperSize();
      obj.update(); // A flag that allows checking whether the group has been edited by the user.

      obj.edited = false;
    } // constructor
    // Setting hte user is important to for interactions with the annotations.


    _createClass(Group, [{
      key: "user",
      get: // set user
      function get() {
        return this._user;
      } // get user
      // set and get current node ui?? This also ensures that the group div fully covers the actual item, and therefore the group gets dragged as opposed to the individual item.
      ,
      set: function set(name) {
        var obj = this; // The commenting needs to know who is looking at it.

        obj.commenting.user = name; // Store the name

        obj._user = name; // Toggle the dissolve button if the user has any annotations.

        var currentUserAnnotations = obj.tags.filter(function (tag) {
          return tag.author == name;
        });

        if (currentUserAnnotations.length > 0) {
          obj.node.querySelector("button.dissolve").style.display = "";
        } // if

      }
    }, {
      key: "current",
      get: // set current
      function get() {
        return this._current;
      } // get current
      ,
      set: function set(item) {
        var obj = this; // First return the ui controls if needed.

        obj.returnUiElements(); // Now append the new current ui controls.

        obj.borrowUiElements(item); // If the commenting has already been established, update the user.

        if (obj.commenting) {
          obj.commenting.user = item.ui.commenting.user;
        } // if


        if (obj._current) {
          obj._current.node.style.display = "none";
        } // if


        item.node.style.display = "inline-block";
        obj._current = item;
      }
    }, {
      key: "updateWrapperSize",
      value: function updateWrapperSize() {
        var obj = this; // Interactions with the commening are not possible if the item is covered by an empty div.

        obj.wrappedview.style.width = obj.current.node.querySelector("div.view").style.width;
        obj.wrappedview.style.height = obj.current.node.querySelector("div.view").style.height;
      } // updateWrapperSize

    }, {
      key: "borrowUiElements",
      value: function borrowUiElements(item) {
        var obj = this;
        obj.wrappednode.querySelector("div.playcontrols-proxy").appendChild(item.ui.playcontrols.node);
        obj.wrappednode.querySelector("div.chapterform-proxy").appendChild(item.ui.chapterform.node);
      } // borrowUiElements

    }, {
      key: "returnUiElements",
      value: function returnUiElements() {
        var obj = this;
        var pc = obj.wrappednode.querySelector("div.playcontrols-proxy").children[0];

        if (pc) {
          obj.current.ui.playControlsWrapperNode.appendChild(pc);
        } // if


        var cf = obj.wrappednode.querySelector("div.chapterform-proxy").children[0];

        if (pc) {
          obj.current.ui.chapterFormWrapperNode.appendChild(cf);
        } // if

      } // returnUiElements

    }, {
      key: "update",
      value: function update() {
        var obj = this; // Make a bookmark tab for each of the members. When the tab is moused over, the view should change. First remove allthe bookmarks before updating.

        var bookmarksToRemove = obj.bookmarks.querySelectorAll("div.mark");

        for (var i = 0; i < bookmarksToRemove.length; i++) {
          bookmarksToRemove[i].remove();
        } // for
        // Items should also be moved in order to update the view. And they should be triggered to draw.


        obj.members.forEach(function (item, i) {
          var bookmark = html2element(bookmarktemplate);
          obj.bookmarks.appendChild(bookmark);

          bookmark.onmouseenter = function () {
            obj.highlightBookmark(bookmark); // Place the item at the end of the draing line.

            obj.drawingorder.splice(obj.drawingorder.indexOf(item), 1);
            obj.drawingorder.push(item);
            obj.current = item;
            obj.updateWrapperSize();
          }; // onmouseover


          var pressTimer;

          bookmark.onmouseup = function () {
            clearTimeout(pressTimer);
            return false;
          }; // onmouseup


          bookmark.onmousedown = function () {
            pressTimer = window.setTimeout(function () {
              obj.release(item, obj.getReleaseScales());
              obj.members.splice(obj.members.indexOf(item), 1);
              obj.current = obj.members[0];
              obj.update();
            }, 2000);
            return false;
          }; // onmousedown


          if (obj.current == item) {
            obj.highlightBookmark(bookmark);
          } // if

        }); // forEach
        // Collect all hte member comments, and put them into a combined commenting item.

        obj.commenting.clear();
        var allComments = obj.members.reduce(function (acc, member) {
          return acc.concat(member.ui.commenting.comments);
        }, []).map(function (commentobj) {
          return commentobj.config;
        }).sort(function (a, b) {
          return Date.parse(a.time) - Date.parse(b.time);
        }); // reduce().sort()

        allComments.forEach(function (comment) {
          obj.commenting.add(comment);
        }); // forEach
      } // update

    }, {
      key: "highlightBookmark",
      value: function highlightBookmark(b) {
        var obj = this;
        var allBookmarks = obj.bookmarks.querySelectorAll("div.mark");

        for (var i = 0; i < allBookmarks.length; i++) {
          allBookmarks[i].style.backgroundColor = b == allBookmarks[i] ? "gray" : "gainsboro";
        } // for

      } // highlightBookmarks

    }, {
      key: "remove",
      value: function remove() {
        // All the members should be made visible again, and their comment sections should be turned back on, and they should be staggered to their relative psitions.
        var obj = this; // First return the ui elements so that the items are again complete.

        obj.returnUiElements(); // When ungrouping the items should be positioned close to where the group used to be (within 1 width of the item). Position the exiting items within 1 width of the top left corner.
        // What I really want is to get the maximum relative distances, scale them down, and then calculate where to position hte items.

        var scales = obj.getReleaseScales(); // Redistribute the items according to their original positions.`		

        obj.members.forEach(function (item, i) {
          obj.release(item, scales);
        }); // forEach

        obj.members = []; // Remove the actual DOM.

        obj.node.remove();
      } // remove

    }, {
      key: "release",
      value: function release(item, scales) {
        var obj = this; // Need to calculate the position to release to...

        item.node.querySelector("div.label").style.color = "#888";
        item.node.style.display = "inline-block";
        item.ui.node.style.display = "";
        item.node.style.boxShadow = "1px 2px 4px 0px rgba(0,0,0,0.25)";
        var x = parseInt(item.node.style.left) + scales.x.dom2range(item.initialposition[0]);
        var y = parseInt(item.node.style.top) + scales.y.dom2range(item.initialposition[1]);
        item.node.style.left = x + "px";
        item.node.style.top = y + "px";
        delete item.initialposition;
        obj.edited = true;
      } // release

    }, {
      key: "add",
      value: function add(item) {
        // Add an item to the group by dragging it over the group.
        var obj = this;
        obj.members.push(item); // Make a temporary attribute to store the position at which the noe was collected.

        item.initialposition = [parseInt(item.node.style.left), parseInt(item.node.style.top)];
        item.node.style.left = obj.node.style.left;
        item.node.style.top = obj.node.style.top;
        item.node.querySelector("div.label").style.color = "transparent";
        item.node.style.boxShadow = "none";
        item.node.style.display = obj.current == item ? "inline-block" : "none";
        item.ui.node.style.display = "none"; // A flag highlighting that the group has changed.

        obj.edited = true;
      } // add

    }, {
      key: "dissolve",
      value: function dissolve() {
        var obj = this; // Soo, find all hte annotations that can be dissolved, and then dissolve them. This will require a call to the knowledge manager. How should this be messaged upstream?

        var currentUserAnnotations = obj.tags.filter(function (tag) {
          return tag.author == obj.user;
        });
        obj.dissolveexternal(currentUserAnnotations);
        obj.remove();
      } // dissolve

    }, {
      key: "actualise",
      value: function actualise() {
        var obj = this; // Similarto before, first dissolve all the annotations by this user, and then add new annotations for all members.

        var currentUserAnnotations = obj.tags.filter(function (tag) {
          return tag.author == obj.user;
        });
        obj.dissolveexternal(currentUserAnnotations);
        var t = Date();
        var newAnnotations = obj.members.map(function (item, i) {
          return {
            id: "".concat(obj.user, " ").concat(t, " ").concat(i),
            taskId: item.ui.metadata.taskId,
            label: obj.node.querySelector("div.label").innerText,
            author: obj.user
          };
        });
        obj.createexternal(newAnnotations);
      } // actualise

    }, {
      key: "dissolveexternal",
      value: function dissolveexternal(a) {
        console.log("Remove annotations: ", a);
      } // dissolveexternal

    }, {
      key: "createexternal",
      value: function createexternal(a) {
        console.log("Make annotations: ", a);
      }
    }, {
      key: "getReleaseScales",
      value: function getReleaseScales() {
        var obj = this;
        var domain = obj.members.reduce(function (acc, member) {
          acc.x[0] = acc.x[0] > member.initialposition[0] ? member.initialposition[0] : acc.x[0];
          acc.x[1] = acc.x[1] < member.initialposition[0] ? member.initialposition[0] : acc.x[1];
          acc.y[0] = acc.y[0] > member.initialposition[0] ? member.initialposition[0] : acc.y[0];
          acc.y[1] = acc.y[1] < member.initialposition[0] ? member.initialposition[0] : acc.y[1];
          return acc;
        }, {
          x: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY],
          y: [Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY]
        });
        var xscale = new scaleLinear();
        xscale.domain = domain.x;
        xscale.range = [-150, 150];
        var yscale = new scaleLinear();
        yscale.domain = domain.y;
        yscale.range = [-150, 150];
        return {
          x: xscale,
          y: yscale
        };
      } // releaseScales

    }]);

    return Group;
  }(); // Group

  var template = "\n<polygon class=\"lasso\" points=\"\" style=\"fill: cornflowerblue; stroke: dodgerblue; stroke-width: 2; opacity: 0.4;\"></polygon>\n"; // template

  var lasso = /*#__PURE__*/function () {
    /* 
    	`lasso' implements a generic lasso that can be added to svg elements.
    
    The input MUST be an svg element to which a d3.drag event can be applied.
    
    
    If the lasso has access to the data then it can compute the selected tasks as a computed. Otherwise a wrapper may be necessary, that will observe the lasso boundary, and then
    */
    function lasso(svg) {
      _classCallCheck(this, lasso); // Make reactive??


      var obj = this;
      obj.svg = svg;
      obj.polygon = svg.appendChild(svg2element(template)); // An internal boundary is used for all the drawing, and an external boundary is presented to other interested modules. Only the exposed boundary is observable. The exposed boundary is used to determine the lasso selection.

      obj._boundary = [];
      obj.boundary = [];
      obj.svg.addEventListener("mousedown", function (event) {
        obj.clearBoundary();
        obj.active = true;
      }); // mousedown

      obj.svg.addEventListener("mousemove", function (event) {
        if (obj.active) {
          obj.addBoundaryPoint(event);
          obj.draw();
        } // if

      }); // mousedown

      obj.svg.addEventListener("mouseup", function (event) {
        obj.hide(); // The bounadry.replace was mobx functionality.

        obj.boundary = obj._boundary;
        obj.active = false;
      }); // mousedown
    } // constructor


    _createClass(lasso, [{
      key: "clearBoundary",
      value: function clearBoundary() {
        var obj = this;
        obj._boundary = [];
      } // clearBoundary

    }, {
      key: "addBoundaryPoint",
      value: function addBoundaryPoint(event) {
        var obj = this; // The svgbox changes if the user scrolls around in the window.

        var svgbox = obj.svg.getBoundingClientRect();

        obj._boundary.push({
          x: event.clientX - svgbox.x,
          y: event.clientY - svgbox.y
        });
      } // addBoundaryPoint

    }, {
      key: "isPointInside",
      value: function isPointInside(point) {
        // Check wheteher the 'point' [pixel coordinates] is within the polygon defined by the points array 'boundary'.
        var obj = this; // Default answer is no.

        var isInside = false;
        var n = obj.boundary.length;

        if (n > 2) {
          for (var i = 1; i < n; i++) {
            // Check whether this edge is being passed when moving from the point to the right. If it passes an even number of edges it's outside, otherwise it's inside.
            var _p = passesEdge(obj.boundary[i - 1], obj.boundary[i], point);

            isInside = _p ? !isInside : isInside;
          } // for
          // Need to check the same number of edge segments as vertex points. The last edge should be the last and the first point.


          var p = passesEdge(obj.boundary[n - 1], obj.boundary[0], point);
          isInside = p ? !isInside : isInside;
        } // if


        return isInside;
      } // isPointInside

    }, {
      key: "draw",
      value: function draw() {
        var obj = this;
        obj.polygon.setAttribute("points", obj._boundary.map(function (p) {
          return "".concat(p.x, ",").concat(p.y);
        }).join(" "));
      } // draw

    }, {
      key: "hide",
      value: function hide() {
        // Remove the selection drawing.
        var obj = this;
        obj.polygon.setAttribute("points", "");
      } // remove

    }]);

    return lasso;
  }(); // lasso

  function passesEdge(p0, p1, point) {
    // One point needs to be above, while the other needs to be below -> the above conditions must be different.
    if (p0.y > point.y !== p1.y > point.y) {
      // One is above, and the other below. Now find if the x are positioned so that the ray passes through. Essentially interpolate the x at the y of the point, and see if it is larger.
      var x = (p1.x - p0.x) / (p1.y - p0.y) * (point.y - p0.y) + p0.x;
      return x > point.x;
    } else {
      return false;
    } // if

  } // checkIntersect

  /* 
  Make a class that will be able to perform most coordination tasks required for the spatial harnessing. This involves getting and setting the coordinates of the small multiples.


  Should groups allow the user to enter them? Maybe its simpler to restrict the navigation solely to the navigation tree. Otherwise when clicking on a group node it has to communicate to the GroupingCoordinator to initiate the change, and also keep track of the descendant groups.

  If navigation is constrained to the navigation tree, then groups can just be an array of arrays of tasks. Maybe the navigation trre should be controlled from within here? And then the hierarchy can be used to create the groups on the go?
  	

  */

  var GroupingCoordinator = /*#__PURE__*/function () {
    function GroupingCoordinator(items, container, svg) {
      _classCallCheck(this, GroupingCoordinator); // Container is only needed if groups need to be appended.


      var obj = this;
      obj.container = container;
      obj.items = items;
      obj.tasks = items.map(function (item) {
        return item.ui.metadata.taskId;
      });
      obj.groups = []; // First the items need to be draggable to allow for grouping.

      obj.addDraggingToSiblingItems(80); // The hierarchy is essentially a function of the grouping. The navigation tree can therefore be used to create teh grouping interface.

      obj.navigation = new TreeRender([]); // navigationsvg.appendChild(obj.navigation.node)
      // obj.navigation.update();

      obj.navigation.moveto = function (nodeobj) {
        // Now remove all existing group items, hide all unnecessary items, calculate the direct descendant groups, and create items for them.
        var current = nodeobj.connections.group.members;
        obj.clear();
        obj.showCurrentTasks(current);
        obj.makeDirectDescendantGroups(nodeobj);
      }; // moveto
      // Add the treenavigation graphic.


      svg.querySelector("g.tree").appendChild(obj.navigation.node);
      obj.navigation.update(); // On lasso mouseup the GroupingCoordinator should create an additional group based on the lasso selection. So maybe this should all be moved into the knowledge manager?

      new lasso(svg);
    } // constructor


    _createClass(GroupingCoordinator, [{
      key: "clear",
      value: function clear() {
        var obj = this;
        obj.groups.forEach(function (group) {
          group.remove();
        });
        obj.groups = [];
      } // clear
      // When the parent group is specified the items should be adjusted immediately.

    }, {
      key: "showCurrentTasks",
      value: function showCurrentTasks(tasks) {
        var obj = this; // First find if any of the specified tsks are valid.

        var validtasks = tasks.filter(function (task) {
          return obj.tasks.includes(task);
        });

        if (validtasks.length > 0) {
          obj.items.forEach(function (item) {
            if (validtasks.includes(item.ui.metadata.taskId)) {
              item.node.style.display = "";
            } else {
              item.node.style.display = "none";
            } // if

          }); // forEach
        } // if

      } // showCurrentTasks

    }, {
      key: "makeDirectDescendantGroups",
      value: function makeDirectDescendantGroups(nodeobj) {
        var obj = this; // First remove all existing groups.

        obj.groups.forEach(function (group) {
          group.remove();
        }); // forEach
        // Find all groups that should appear.

        var descendants = nodeobj.connections.descendants;
        var directDescendants = descendants.filter(function (group) {
          return !descendants.some(function (d) {
            if (d != group) {
              return arrayIncludesAll(d.members, group.members);
            } // if


            return false;
          }); // some
        }); // filter
        // Make all groups that should appear.

        directDescendants.forEach(function (d) {
          // Pass the actual item objects to the group.
          var members = obj.items.filter(function (item) {
            return d.members.includes(item.ui.metadata.taskId);
          }); // filter
          // 'obj.items' needs to always be passed in so that when the bookmarks are moused over the drawing order can change. Tags are passed in to allow changes to be made.

          var groupitem = new Group(obj.items, members, d.tags);
          obj.groups.push(groupitem);
          obj.container.appendChild(groupitem.node);

          var ondrag = function ondrag() {
            groupitem.members.forEach(function (item) {
              item.node.style.left = groupitem.node.style.left;
              item.node.style.top = groupitem.node.style.top;
            });
          };

          addDraggingToItem(groupitem, undefined, ondrag);

          groupitem.dissolveexternal = function (a) {
            obj.dissolveexternal(a);
          }; // function


          groupitem.createexternal = function (a) {
            obj.createexternal(a);
          }; // function

        }); // forEach
      } // makeDirectDescendantGroups
      // Proxies.

    }, {
      key: "dissolveexternal",
      value: function dissolveexternal(a) {
        console.log("Remove annotations", a);
      } // dissolveexternal

    }, {
      key: "createexternal",
      value: function createexternal(a) {
        console.log("Make annotations", a);
      } // createexternal

    }, {
      key: "getCurrentPositions",
      value: function getCurrentPositions(items, variable) {
        // Current positions are needed for calculating correlations, or for adding additional metadata variables based on the users actions. How should the positions and the metadata be combined actually? Should there be a specific method for it? If a variable is specified, then return it with the positions.
        return items.map(function (item) {
          var pos = [ParseInt(item.node.style.left), ParseInt(item.node.style.top)];

          if (variables != undefined) {
            pos.push(item.metadata[variable]);
          } // if


          return pos;
        }); // map
      } // getCurrentPositions

    }, {
      key: "addDraggingToSiblingItems",
      value: function addDraggingToSiblingItems(headeroffset) {
        // To add the dragging an additional "dragging" attribute is introduced to the items. The items are ViewFrame objects that all have their nodes inside the same parent node. The parent node must be the same as the initial positions of the frames are calculated based on their current positions within hte parent div.
        var obj = this;
        var positions = obj.items.reduce(function (acc, item) {
          acc.push([item.node.offsetLeft, item.node.offsetTop + headeroffset]);
          return acc;
        }, []);
        obj.items.forEach(function (item, i) {
          item.node.style.position = "absolute";
          item.node.style.left = positions[i][0] + "px";
          item.node.style.top = positions[i][1] + "px";

          var onstart = function onstart() {
            // Move this item to the end of the drawing queue to ensure it's drawn on top.
            obj.items.splice(obj.items.indexOf(item), 1);
            obj.items.push(item);
          }; // function


          var onend = function onend() {
            console.log("Check if item should be added to group"); // It should be either if hte item is fully within hte group, or very close to the top left corner?

            obj.groups.every(function (group) {
              // Item should jut be added to a single group.
              var addToThisGroup = sufficientlyOverlaid(item, group);

              if (addToThisGroup) {
                group.add(item);
                group.update();
              } // if


              return !addToThisGroup;
            }); // every
          }; // function


          addDraggingToItem(item, onstart, undefined, onend);
        }); // forEach
      } // addDraggingToSiblingItems

    }, {
      key: "setPositionsByMetadata",
      value: function setPositionsByMetadata(items, variable) {// Reposition hte items on screen given their metadata values. Reposition to within the current client viewport, or the whole document? Whole document to spread the small multiples out a bit.
      } // setPositionsByMetadata

    }, {
      key: "makeGroupFromArrayOfItems",
      value: function makeGroupFromArrayOfItems(items) {// Calculate the position of the group and create the html elements required for it. How should the renderer be convinced to draw the appropriate contours? It gets the viewport directly from the ViewFrame, which in this case will be disabled. Allow the group object to pass it's own viewport to the correct item, and use them if the div is set to display none?
      } // makeGroupFromArrayOfItems

    }]);

    return GroupingCoordinator;
  }(); // GroupingCoordinator

  function sufficientlyOverlaid(item, group) {
    var itemrect = item.node.getBoundingClientRect();
    var grouprect = group.node.getBoundingClientRect();
    var itemFullyInGroup = grouprect.left <= itemrect.left && itemrect.right <= grouprect.right && grouprect.top <= itemrect.top && itemrect.bottom <= grouprect.bottom;
    var itemCloseEnough = Math.pow(grouprect.left - itemrect.left, 2) + Math.pow(grouprect.top - itemrect.top, 2) < Math.pow(40, 2);
    return itemFullyInGroup || itemCloseEnough;
  } // sufficientlyOverlaid

  function sortCommentsBeforePushing(a, b) {
    // The primary comments must be added first so that the replies can be added to them. The comments can just be sorted by time of creation. Replies can only be created after the primary comment.
    return Date.parse(a.time) - Date.parse(b.time);
  } // sortCommentsBeforePushing

  var KnowledgeManager = /*#__PURE__*/function () {
    function KnowledgeManager(items, container, svg) {
      _classCallCheck(this, KnowledgeManager); // All knowedge must be pushed to individual IPUI (Interactive Player User Interfaces) when received.


      var obj = this;
      obj.items = items; // Tags and chapters should be available for correlations. Tags and chapters are time invariant, but the metadata IS time variant. So even the metadata needs to be queried!
      // Add the dragging externally. The tabletop was positioned absolutely, with top: 0px. If this is not so the dragging will move the items on the initial drag start by the offset amount.
      // The grouping coordinator does: adds dragging, positioning of the items by metadata values, retrieveng position and metadata pairs, grouping, and grouping navigation.
      // Groups need to be added to the same container as the actual items, otherwise either the items cant be dragged over the groups, or vice versa.

      obj.grouping = new GroupingCoordinator(items, container, svg);
      /*
      New comments must be passed to the stores. Also, when up/downvotes change it should be sent to the server. The local version should also be updated straight away.
      
      upvote/downvote are in 'Comment.js';
      reply button onclick is in 'addGeneralComment' of 'CommentingManager.js';
      submit button onclick is in 'constructor' of 'CommentingManager.js';
      
      How to post the comments to the server? Should each individual be able to post itself to the server? Because it will have to post changes on itself, for example up/downvotes. Anyway, can be left for later for now.
      */
      // Make some proxy stores that simulate the communication with the server. Connect them to the points where the annotations are submitted, so that they circulate through the stores.

      obj.comments = new ProxyServerStore('./data/annotations/testcomments.json');

      obj.comments.update = function () {
        obj.updateAllComments();
      }; // update


      obj.chapters = new ProxyServerStore('./data/annotations/testchapters.json');

      obj.chapters.update = function () {
        obj.updatePlaybarChapters();
      }; // update


      obj.tags = new ProxyServerStore('./data/annotations/testtags.json');

      obj.tags.update = function () {
        obj.updateTagAnnotations();
      }; // update
      // REMOVING TAGS NEEDS TO BE DONE BY ACTUAL ANNOTATION ID!!!
      // What should the grouping do when the annotations are made/dissolved through it?


      obj.grouping.dissolveexternal = function (a) {
        // Only the tags get dissolved:
        a.forEach(function (a_) {
          obj.tags.remove(a_);
        }); // forEach
      }; // dissolveexternal


      obj.grouping.createexternal = function (a) {
        a.forEach(function (a_) {
          obj.tags.add(a_);
        }); // forEach
      }; // createexternal
      // Make the forms submit the annotations to the appropriate stores, which will then in turn update the display modules.


      obj.items.forEach(function (item) {
        // Chapter annotations should update the playbar, the discussion tags, and the navigation tree.
        item.ui.chapterform.submit = function (chapter) {
          obj.chapters.add(chapter);
        }; // submit

      }); // forEach
    } // constructor


    _createClass(KnowledgeManager, [{
      key: "updateAllComments",
      value: function updateAllComments() {
        // Now add in some test comments
        var obj = this;
        obj.comments.data.sort(sortCommentsBeforePushing).forEach(function (comment) {
          obj.items.forEach(function (item) {
            if (item.ui.viewid == comment.viewid) {
              item.ui.commenting.add(comment);
            } // if  

          }); // forEach
        }); // forEach
      } // updateAllComments

    }, {
      key: "updatePlaybarChapters",
      value: function updatePlaybarChapters() {
        var obj = this;
        obj.chapters.data.forEach(function (ch) {
          obj.items.forEach(function (item) {
            if (item.ui.metadata.taskId == ch.taskId) {
              item.ui.playcontrols.bar.addchapter(ch);
              var discussiontags = item.ui.playcontrols.bar.annotations.map(function (a) {
                return a.label;
              });
              item.ui.commenting.discussion.update(discussiontags);
            } // if  

          }); // forEach
        }); // forEach

        obj.updateNavigationTree();
      } // updatePlaybarChapters

    }, {
      key: "updateTagAnnotations",
      value: function updateTagAnnotations() {
        var obj = this; // Just the navigation tree needs to be updated. However, the chapters are treated as tags also - if the group is dissolved, does it mean the chapters will get dissolved also? Orshould chapters be exempt from dissolving? Where should that be handled? Just not calling the chapter database for removal, and banking that no tag has the same id?

        obj.updateNavigationTree();
      } // updateTagAnnotations

    }, {
      key: "updateNavigationTree",
      value: function updateNavigationTree() {
        var obj = this; // Previously the tasks were pushed to the hierarchy, with the tags attached. Now the tags are standalone, and the task ids should be given to the hierarchy separately. Maybe just make them as new tags and merge them together here?

        var tasktags = obj.items.map(function (item) {
          return {
            taskId: item.ui.metadata.taskId,
            label: "Root",
            author: "session"
          };
        });
        obj.grouping.navigation.hierarchy.data = tasktags.concat(obj.tags.data).concat(obj.chapters.data);
        obj.grouping.navigation.update();
      } // updateNavigationTree

    }]);

    return KnowledgeManager;
  }(); // KnowledgeManager

  var ProxyServerStore = /*#__PURE__*/function () {
    function ProxyServerStore(filename) {
      _classCallCheck(this, ProxyServerStore);

      var obj = this;
      obj.data = [];
      fetch(filename).then(function (response) {
        return response.json();
      }).then(function (data) {
        obj.data = data;
        obj.update();
        return data;
      });
    } // constructor


    _createClass(ProxyServerStore, [{
      key: "add",
      value: function add(item) {
        // Check if the item is already present. Replace it, or just update the delta? Bank on the idea that no two queries will be simultaneous?
        var obj = this;
        var i = obj.data.findIndex(function (d) {
          return d.id == item.id;
        });
        obj.data.splice(i > -1 ? i : 0, i > -1, item);
        obj.update();
      } // add

    }, {
      key: "remove",
      value: function remove(item) {
        var obj = this;
        var i = obj.data.findIndex(function (d) {
          return d.id == item.id;
        });
        obj.data.splice(i, i > -1);
        obj.update();
      } // remove

    }, {
      key: "update",
      value: function update() {
        // Implement the push of all the comments etc to the actual modules for display.
        console.log("server pushes changes");
      } // update
      // Maybe no query is required anyway? Each project would have its own annotations, which are always loaded anyway? Unless you go into a list of users and remove them?

    }]);

    return ProxyServerStore;
  }(); // ProxyServerStore

  /* To do: 
    DONE: - allow scrolling
    DONE: - add style to frames.
    DONE: - make divs appear side by side also
    DONE: - don't update invisible divs
    DONE: - zooming, panning
    
    DONE: - use the actual data
    DONE: - value based color shader calculation
    DONE: - (panning relaxation must be manually adjusted) - 2D and 3D cameras.
    DONE: - auto set the original domain (DONE (width, height), near/far plane)

    DONE: - dragging frames around
    - auto selecting the height of the viewport in pixels
    - pinch gestures
    - play multiple views at once.
    - loading buffering && data limitation, and subsequent viewframe number limitation.
    
    DONE: - expandable description and tools section?
    DONE: - adding chapter annotations
        The annotations are not really chapters. They can be, but they should also support having a start AND end points, and be allowed to overlap. The playbar san still show them in order of appearance, but a more general view of the tag annotations should be available.
    DONE comments, reintroduce tags as threads
    - spatial arranging and metadata connection
    DONE: - tree hierarchy
  	  Need to still connect the tag adding to update the navigation tree. Maybe in this smaller example it's better to have the tree just under the title?
    DONE grouping (hierarchy operates on tags, and is thus independent of grouping)
    - lasso
  	  How do I want the lasso to work? Do I want the toolbar? Or is it better to just make the group straightaway? In that case where should the option to make ordinal tags be?
  	  Because it' grouping, categorical tags (can use the chapter form), and ordinal tags.
    
    - put it all on a github webpage??
    
  */

  /*

  Arranging by metadata: some metadata will change with respect to time. But those will have to be collected on the go - because the players can be navigated to different times. It's easiest to have this metadata attached to the timesteps. This is ok for now.

  Unsteady dbslice: How should the unsteady dbslice handle this data? Should every timestep be a different row in the metadata? Or should unsteady metadata be structured differently, with each attribute being an array of time-value pairs?

  */
  // Hierarchy expects each task object to have some tags. Maybe the metadata should be loaded in from some database, and then converted to an object which includes the tags?

  var metadata = [{
    taskId: "0",
    label: "Maybe we",
    slice: "./data/testmetadata.json"
  }, {
    taskId: "1",
    label: "should add",
    slice: "./data/testmetadata_copy0.json"
  }, {
    taskId: "2",
    label: "some more",
    slice: "./data/testmetadata_copy1.json"
  }, {
    taskId: "3",
    label: "tasks.",
    slice: "./data/testmetadata_copy2.json"
  }]; // metadata
  var canvas = document.getElementById("canvas");
  var container = document.getElementById("table-top");
  var svg = document.querySelector("svg.hud"); // The MeshRenderer implements the frag and color shaders, and runs the main drawing loop.
  var renderer = new MeshRenderer2D(canvas, container); // Add the players in. The HTML will position hte frames.

  for (var i = 0; i < 4; i++) {
    var m = metadata[i]; // Player is added within the MeshRenderer because it needs the 'gl'.

    var p = renderer.add(m.slice);
    p.title(m.label);
    p.ui.metadata = m;
  } // for
  // The renderer starts updating straight away. It's the responsibility of the geometries to provide something to draw. In the end some initial geometry is provided as default, as the buffers are initialised straight away.


  renderer.draw();
  console.log(renderer); // Knowledge manager handles the communication with the server, the updating of the relevant modules, and the grouping, navigation, and spatial arrangement.
  var km = new KnowledgeManager(renderer.items, container, svg);
  console.log(km); // COMMENTING: Add the login info.

  var login = document.querySelector("div.login").querySelector("input");

  login.oninput = function () {
    renderer.items.forEach(function (item) {
      item.ui.user = login.value;
    }); // forEach
    // Groups also need the author to be updated.

    km.grouping.groups.forEach(function (group) {
      group.user = login.value;
    }); // forEach
  }; // oninput

  /*
  Adding/removing items to/from groups changes the groups. The changes should only be saved on demand. There should be a button that allows appears when changes were made. 

  The changes should allow only a new group to be made, or the old one dissolved. To dissolve a group it's annotations need to be removed. For this the annotations will require to have annotation ids.

  Only allow the author of hte group to dissolve it. Also means the groups need to follow the current author.


  Dissolving deletes the annotations by the current user.
  Saving the edited changes just makes new annotations? Or first deletes all theold ones, and then saves the new ones?


  Change the chapterform also! It should allow submitting annotations without a starttime, but only those with a starttime can be added as chapters.
  */

}());
//# sourceMappingURL=webgldrawing.js.map
