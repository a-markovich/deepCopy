function deepCopy (argument) {
    let copy;

    if (Array.isArray(argument)) {
        copy = argument.slice();
        for (let i = 0; i < copy.length; i++) {
            if (typeof copy[i] === 'object'  && copy[i] !== null) {
                copy[i] = deepCopy (copy[i]);
            }  
        }
    } else if (typeof argument === 'object' && argument !== null) {
        copy = {};
        for (let key in argument) {
            copy[key] = argument[key];
            if (typeof copy[key] === 'object' && copy[key] !== null) {
                copy[key] = deepCopy (copy[key]);
            }
            
        }
    } else {
        copy = argument;
    }
    return copy;
}

describe('deepCopy - функция для глубокого копирования переданного ей значения', function() {

    var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
    var h2=deepCopy(h1);

    var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
    var a2=deepCopy(a1);

    var v1="sss";
    var v2=deepCopy(v1);

    var z1=null;
    var z2=deepCopy(z1);

    var n1=Number.NaN;
    var n2=deepCopy(n1);

    const testSet=[
      {a:h1, b:h2,  roots:false},
      {a:h1.a, b:h2.a, roots:true},
      {a:h1.b, b:h2.b, roots:false},
      {a:h1.b.b1, b:h2.b.b1, roots:true},
      {a:h1.c, b:h2.c, roots:false},
      {a:h1.c[0], b:h2.c[0], roots:true},
      {a:h1.d, b:h2.d, roots:true},
      {a:h1.e, b:h2.e, roots:true},

      {a:a1, b:a2, roots:false},
      {a:typeof(a2), b:typeof(a1), roots:true},
      {a:a1[0], b:a2[0], roots:true},
      {a:a1[1], b:a2[1], roots:false},
      {a:a1[1].b1, b:a2[1].b1, roots:true},
      {a:a1[2], b:a2[2], roots:false},
      {a:a1[2][0], b:a2[2][0], roots:true},
      {a:a1[3], b:a2[3], roots:true},
      {a:a1[4], b:a2[4], roots:true},

      {a:typeof(v2), b:typeof(v1), roots:true},
      {a:v1, b:v2, roots:true},

      {a:typeof(z2), b:typeof(z1), roots:true},
      {a:z1, b:z2, roots:true},

      {a:typeof(n2), b:typeof(n1), roots:true},
    ];

    let compare = (a, b) => a === b;
    let isNotANumber = (c) => isNaN(c);
    let belongArr = (d) => d instanceof Array;

    for ( let test of testSet ) {
      it(`тест сравнения значений пройден`, function(){
          assert.deepEqual(compare(test.a, test.b), test.roots);
      });
    }
    
    it(`isNaN(h2.f) пройден`, function(){
        assert.isTrue(isNotANumber(h2.f), true);
    });
    it(`isNaN(a2[5]) пройден`, function(){
        assert.isTrue(isNotANumber(a2[5]));
    });
    it(`isNaN(n2) пройден`, function(){
        assert.isTrue(isNotANumber(n2));
    });

    it(`(h2.c instanceof Array) пройден`, function(){
        assert.isTrue(belongArr(h2.c));
    });

    it(`(a2[2] instanceof Array) пройден`, function(){
        assert.isTrue(belongArr(a2[2]));
    });
    
});

mocha.run();