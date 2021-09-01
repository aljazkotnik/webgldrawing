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

  /*
  A test mesh for use during transitioning.
  */

  var vertices = [0, 0, 1, 0, 2, 0, 0, 1, 1, 1, 2, 1, 3, 1, 1, 2, 2, 2, 3, 2, 1, 3, 2, 3]; // vertices
  // clockwise triangles. 

  var indices = [0, 3, 4, 0, 4, 1, 1, 4, 5, 1, 5, 2, 4, 7, 8, 4, 8, 5, 5, 8, 9, 5, 9, 6, 7, 10, 11, 7, 11, 8]; // indices

  var values = [0, 0, 0, 0, 1, 2, 3, 2, 4, 6, 3, 6]; // values

  var Mesh2D = function Mesh2D(gl) {
    _classCallCheck(this, Mesh2D);

    this.domain = {
      x: [0, 3],
      y: [0, 3],
      v: [0, 6],
      c: [0, 6]
    };
    var obj = this; // obj.vertices = vertices;
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
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
    obj.indicesBuffer = indicesBuffer;
    obj.indicesLength = indices.length;
  } // constructor
  ; // Mesh2D
   // getBinData

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
          // Angles have to be in radians!! Division by 4 is just a relaxation parameter.
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

  function html2element(html) {
    var template = document.createElement('template');
    template.innerHTML = html.trim(); // Never return a text node of whitespace as the result

    return template.content.firstChild;
  } // html2element

  var template = "\n<div class=\"item\">\n  <div class=\"view\" style=\"width:300px; height:300px; opacity:0;\">\n  </div>\n  \n  <div class=\"label\">\n  </div>\n</div>\n";

  var ViewFrame2D = /*#__PURE__*/function () {
    function ViewFrame2D(gl) {
      _classCallCheck(this, ViewFrame2D);

      var obj = this;
      obj.gl = gl;
      obj.node = html2element(template); // Actual geometry to be drawn.

      obj.geometry = new Mesh2D(gl); // Transformation matrices.

      obj.transforms = {};
      /*
      Interactivity:
      What should clicking and dragging do? Pan, or adjust camera angle? 
      
      For 2D panning is more useful.
      For 3D adjusting the camera angle is better.
      */

      obj.camera = new Camera2D();
      obj.camera.nearClippingPlaneDistance = -1;
      obj.camera.farClippingPlaneDistance = 1; // (e.clientX, e.clientY)

      var view = obj.node.querySelector("div.view");

      view.onmousedown = function (e) {
        obj.cameraMoveStart(e);
      };

      view.onmousemove = function (e) {
        obj.cameraMove(e);
      };

      view.onmouseup = function (e) {
        obj.cameraMoveEnd();
      };

      view.onmouseleave = function (e) {
        obj.cameraMoveEnd();
      };

      view.onwheel = function (e) {
        e.preventDefault(); // Store the zoom point.

        obj.cameraMoveStart(e);
        obj.cameraChangeDist(e.deltaY);
      };
    } // constructor

    /* The geometry moving is implemented in 'computeModelMatrix'. User interaction movement is implemented in 'computeViewMatrix'.  */


    _createClass(ViewFrame2D, [{
      key: "computeModelMatrix",
      value: function computeModelMatrix(now) {
        // The model matrix incorporates the initial scaling and translation to make sure the data fits in view.
        var dom = this.geometry.domain; // First translate left bottom corner to origin, scale so that top right domain corner is at 2,2, and then reposition so that domain is between -1 and 1.

        var k = 2 / Math.max(dom.x[1] - dom.x[0], dom.y[1] - dom.y[0]);
        var translateToOrigin = translateMatrix(-dom.x[0], -dom.y[0], 0);
        var scaleToClipSpace = scaleMatrix(k, k, 1);
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
      value: function computeViewMatrix(now) {
        var camera = this.camera; // Only panning is supported. But zooming should also be!

        var position = translateMatrix(camera.x, camera.y, camera.z); // For zooming a scaling operation should be performed. And the zooming should be based on hte pointers position. So that point should stay in hte same position, while the rest of the view scales.
        // The values need to be in coordinate units! So the pixel location needs to be changed to value location.

        var x0 = camera.mouseStart[0] * this.valuePerPixel;
        var y0 = camera.mouseStart[1] * this.valuePerPixel;
        var k = camera.k;
        var translateToOrigin = translateMatrix(-x0, -y0, 0);
        var scaleToZoomSpace = scaleMatrix(k, k, 1);
        var translateToZoomSpace = translateMatrix(x0, y0, 0); // Inverse the operation for camera movements, because we are actually moving the geometry in the scene, not the camera itself.
        // this.transforms.view = invertMatrix( position );

        this.transforms.view = multiplyArrayOfMatrices([translateToZoomSpace, scaleToZoomSpace, translateToOrigin, invertMatrix(position)]); // model
      } // computeViewMatrix

    }, {
      key: "update",
      value: function update(now) {
        var obj = this; // Compute our matrices

        obj.computeModelMatrix(now);
        obj.computeViewMatrix(now);
        obj.computeOrthographicMatrix();
      } // update

    }, {
      key: "viewport",
      get: function get() {
        var obj = this;
        var gl = obj.gl;
        var rect = obj.node.querySelector("div.view").getBoundingClientRect();
        var width = rect.right - rect.left;
        var height = rect.bottom - rect.top;
        var left = rect.left;
        var bottom = gl.canvas.clientHeight - rect.bottom;
        return [left, bottom, width, height];
      } // get viewport

    }, {
      key: "valuePerPixel",
      get: function get() {
        // Get the value per pixel that will definitely fit the whole domain into hte viewport.
        var obj = this;
        var domain = obj.geometry.domain;
        var k = obj.camera.k;
        var arx = k * (domain.x[1] - domain.x[0]) / obj.viewport[2];
        var ary = k * (domain.y[1] - domain.y[0]) / obj.viewport[3];
        return Math.min(arx, ary);
      } // get aspectRatio

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
      key: "cameraChangeDist",
      value: function cameraChangeDist(d) {
        var camera = this.camera; // The 2D camera works off of a zoom value, because the perspective does not change. There is no perspective transformation because the data only has x/y, and to make zoom work through perspective a third z value would

        camera.incrementZoomValue(0.1);
      } // cameraChangeDist

    }]);

    return ViewFrame2D;
  }(); // ViewFrame2D

  var vertshader = "\n//Each point has a position and color\nattribute vec2 position;\nattribute float value;\n\n// The transformation matrices\nuniform mat4 model;\nuniform mat4 view;\nuniform mat4 projection;\n\n// Pass the color attribute down to the fragment shader\nvarying float v_colorval;\n\nvoid main() {\n  \n  // Pass the color down to the fragment shader\n  v_colorval = value;\n  \n  // Read the multiplication in reverse order, the point is taken from the original model space and moved into world space. It is then projected into clip space as a homogeneous point. Generally the W value will be something other than 1 at the end of it.\n  gl_Position = projection * view * model * vec4( position, 0.0, 1.0 );\n}";
  var fragshader = "\nprecision mediump float;\nvarying float v_colorval;\n\nuniform sampler2D colormap;\nuniform float u_cmin, u_cmax;\n\nvoid main() {\n  gl_FragColor = texture2D(colormap, vec2( (v_colorval-u_cmin)/(u_cmax-u_cmin), 0.5));;\n}"; // A viridis colormap. Values for color channels in frag shader should be [0, 1].

  var cmap = new Uint8Array([68, 1, 84, 255, 71, 19, 101, 255, 72, 36, 117, 255, 70, 52, 128, 255, 65, 68, 135, 255, 59, 82, 139, 255, 53, 95, 141, 255, 47, 108, 142, 255, 42, 120, 142, 255, 37, 132, 142, 255, 33, 145, 140, 255, 30, 156, 137, 255, 34, 168, 132, 255, 47, 180, 124, 255, 68, 191, 112, 255, 94, 201, 98, 255, 122, 209, 81, 255, 155, 217, 60, 255, 189, 223, 38, 255, 223, 227, 24, 255, 253, 231, 37, 255]); // cmap

  var MeshRenderer2D = /*#__PURE__*/function () {
    function MeshRenderer2D() {
      _classCallCheck(this, MeshRenderer2D);

      var obj = this;
      var domcontainer = document.getElementById("table-top");
      obj.domcontainer = domcontainer;
      var canvas = document.getElementById("canvas");
      obj.canvas = canvas;
      obj.canvas.width = window.innerWidth;
      obj.canvas.height = window.innerHeight; // Grab a context and setup a program.

      var gl = canvas.value = canvas.getContext("webgl", {
        antialias: true,
        depth: false
      });
      obj.webglProgram = setupProgram(gl);
      obj.gl = gl; // Make a colorbar texture.

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

        var now = Date.now(); // Move the canvas to the right position for scrolling.

        gl.canvas.style.transform = "translateY(".concat(window.scrollY, "px)"); // The actual drawing loop.

        obj.items.forEach(function (item) {
          // Check whether the item is visible or not.
          if (obj.isItemVisible(item)) {
            // Update the ViewFrame to calculate new transform matrices.
            item.update(now); // Update the data going to the GPU

            obj.updateAttributesAndUniforms(item); // Set the rectangle to draw to. Scissor clips, viewport transforms the space. The viewport seems to be doing the scissoring also...

            obj.updateViewport(item); // Perform the actual draw

            gl.drawElements(gl.TRIANGLES, item.geometry.indicesLength, gl.UNSIGNED_SHORT, 0);
          } // if

        }); // forEach

        requestAnimationFrame(obj.draw.bind(obj));
      } // draw

    }, {
      key: "add",
      value: function add(id) {
        var obj = this;
        var newplayer = new ViewFrame2D(obj.gl);
        obj.domcontainer.appendChild(newplayer.node);
        obj.items.push(newplayer);
      } // add

    }, {
      key: "updateViewport",
      value: function updateViewport(item) {
        var gl = this.gl;
        gl.viewport.apply(gl, _toConsumableArray(item.viewport));
        gl.scissor.apply(gl, _toConsumableArray(item.viewport));
        gl.clearColor.apply(gl, [0, 0, 0, 0]);
      } // updateViewport

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

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, item.geometry.indicesBuffer); // The 'u_cmin' and 'u_cmax' are calculated so that they map from the course [0,255] uint8 values to the data values, and from the data values to the desired colormap range. The colormap range is defined by domain.c, and the data range is defined by domain.v.
        // 255*(domain.c[0]-domain.v[0])/(domain.v[1]-domain.v[0]
        // 255*(domain.c[1]-domain.v[0])/(domain.v[1]-domain.v[0]

        gl.uniform1f(locations.cmin, 0);
        gl.uniform1f(locations.cmax, 6);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, obj.colormapTexture);
        gl.uniform1i(locations.colormap, 0);
      } // updateAttributesAndUniforms

    }, {
      key: "isItemVisible",
      value: function isItemVisible(item) {
        // Check whether the current item is visible. Extend later to check whether other items obscure the current item.
        var obj = this;
        var gl = obj.gl;
        var rect = item.node.getBoundingClientRect();
        var isOffScreen = rect.bottom < 0 || rect.top > gl.canvas.clientHeight || rect.right < 0 || rect.left > gl.canvas.clientWidth;
        return !isOffScreen;
      } // isItemVisible

    }]);

    return MeshRenderer2D;
  }(); // MeshRenderer2D

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
    var loc_position = gl.getAttribLocation(program, "position");
    var loc_value = gl.getAttribLocation(program, "value"); // let loc_color = gl.getAttribLocation(program, "color");
    // For 2D triangl culling and depth testing is not needed.
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
        position: loc_position,
        value: loc_value
      },
      program: program
    };
  } // setupProgram

  /* 3D
  import MeshRenderer from "./renderers/MeshRenderer.js";

  // The MeshRenderer is the engine that draws the scene.
  let renderer = new MeshRenderer();

  // Add the players in. The HTML will position hte frames.
  for(let i=0; i<100; i++){
  	renderer.add(i)
  } // for


  // In the end the renderer will have to wait for the data to be loaded. Therefore the update loop should be outside.
  renderer.draw()

  console.log(renderer)
  */

  var renderer = new MeshRenderer2D(); // Add the players in. The HTML will position hte frames.

  for (var i = 0; i < 100; i++) {
    renderer.add(i);
  } // for
  // In the end the renderer will have to wait for the data to be loaded. Therefore the update loop should be outside.


  renderer.draw();
  console.log(renderer);
  /* To do: 
    DONE: - allow scrolling
    DONE: - add style to frames.
    DONE: - make divs appear side by side also
    DONE: - don't update invisible divs
    DONE: - zooming, panning
    
    - use the actual data
    - value based color shader calculation
    DONE: (panning relaxation must be manually adjusted) - 2D and 3D cameras.
    - dragging frames around
    - pinch gestures
    - auto set the original domain (width, height, near/far plane)
  */
  // For 2D drawing the transformation matrices have to be different. That means that the ViewFrame needs to be changed, as that implements the matrices.

}());
//# sourceMappingURL=webgldrawing.js.map
